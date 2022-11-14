"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const villa_1 = __importDefault(require("../models/villa"));
const paymongo_1 = __importDefault(require("paymongo"));
const cron_1 = require("cron");
// before archive 1 year
let archiveJob = new cron_1.CronJob({
    cronTime: '0 1 * * *',
    onTick: () => {
        let currentDate = new Date();
        let yearLessDate = currentDate.setDate(currentDate.getDate() - 365);
        let yearand3MonthsDate = currentDate.setDate(currentDate.getDate() - 455);
        booking_1.default.updateMany({
            dateBooked: {
                $lt: yearLessDate
            }
        }, { $set: { status: 'Archived' } });
        booking_1.default.deleteMany({
            dateBooked: {
                $lt: yearand3MonthsDate,
                status: 'Archived'
            }
        });
    }
});
// after 3 months
const paymongo = new paymongo_1.default('sk_test_rYiCsW2PbSTuDgVxYwX8y68a');
// const paymongo = new Paymongo('sk_live_Gj6a42YVzY5jDPEiQHZcpSoW');
var BookingController;
(function (BookingController) {
    BookingController.webhookGet = async (req, res, next) => {
        try {
            const result = await paymongo.webhooks.list();
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    BookingController.webhookAdd = async (req, res, next) => {
        const data = {
            data: {
                attributes: {
                    url: 'https://ulayaw-backend.herokuapp.com/webhook/listen',
                    events: ['source.chargeable'] // The only event supported for now is 'source.chargeable'.
                }
            }
        };
        try {
            const result = await paymongo.webhooks.create(data);
            return res.status(200).json(result);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    };
    BookingController.webhookListen = async (req, res, next) => {
        let sourceData = req.body.data.attributes.data;
        // create payment
        const data = {
            data: {
                attributes: {
                    amount: sourceData.attributes.amount,
                    currency: 'PHP',
                    source: {
                        id: sourceData.id,
                        type: 'source', // 
                    }
                }
            }
        };
        const result = await paymongo.payments.create(data);
        if (result.data.attributes.status === 'paid') {
            booking_1.default.findOneAndUpdate({ paymentId: sourceData.id }, { isPaid: true }, { new: true }, (err, booking) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                return res.status(200).json({ message: 'Booking Paid', payload: booking });
            });
        }
        else {
            return res.status(400).json({ message: 'Payment Failed' });
        }
    };
    BookingController.payBooking = (req, res, next) => {
        const id = req.params.id;
        // find booking
        booking_1.default.findById({ _id: id }, async (err, booking) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            const amountToPay = booking.paymentType === 'Full' ? booking.totalAmount : booking.totalAmount / 2;
            const data = {
                data: {
                    attributes: {
                        type: 'gcash',
                        amount: amountToPay,
                        currency: 'PHP',
                        redirect: {
                            success: 'https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/success.html?id=' + id,
                            failed: 'https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/failure.html'
                        }
                    }
                }
            };
            try {
                const result = await paymongo.sources.create(data);
                // update booking attach paymentId
                booking_1.default.findByIdAndUpdate({ _id: id }, { paymentId: result.data.id }, { new: true }, (err, booking) => {
                    if (err) {
                        return res.status(500).json({
                            err: err
                        });
                    }
                    return res.status(200).json(result);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    };
    // export const successPay: RequestHandler = async (req, res, next) =>{
    //     console.log('test');
    //     const data ='src_n4edYTf96NThzNDbKhgkN1YR'
    //     try{
    //         const result = await paymongo.sources.retrieve(data);
    //         return res.status(200).json(result);
    //     }catch (error) {
    //         console.error(error);
    //       }  
    // }
    BookingController.addBooking = (req, res, next) => {
        const { villaId, userId, startDate, endDate, bookingType, noOfGuests, totalAmount, addOns } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime();
        let endD = new Date(endDate).getTime();
        let todayD = new Date().getTime();
        if (startD > endD) {
            return res.status(400)
                .json({ error: 400, message: 'End date must not be less than to start date', key: 'INVALIDDATELOGIC' });
        }
        // startDate shoule b greater than today
        if (todayD > startD) {
            return res.status(400)
                .json({ error: 400, message: 'Start date should not be greater than today', key: 'INVALIDDATEHIST' });
        }
        // validatebookingType
        if (bookingType !== 'overnight' && bookingType !== 'daytour') {
            return res.status(400)
                .json({ error: 400, message: 'Invalid booking type. keyword available: overnight or daytour', key: 'INVALIDBOOKINGTYPE' });
        }
        villa_1.default.findById(villaId, (error, _villa) => {
            if (error) {
                return res.status(500).json({
                    err: error
                });
            }
            console.log({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Pending',
                bookingType,
                addOns
            });
            const booking = new booking_1.default({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Pending',
                paymentType: 'Full',
                bookingType,
                addOns,
                noOfGuests,
                totalAmount,
            });
            booking.save((err, newBooking) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                return res.status(201).json({ message: 'Booking created!', bookingId: newBooking._id });
            });
        });
    };
    BookingController.getBookings = (req, res, next) => {
        const { villaId, userId, startDate, endDate, status } = req.query;
        const query = {};
        if (villaId)
            query['villaId'] = villaId;
        if (userId)
            query['userId'] = userId;
        if (startDate)
            query['startDate'] = { $gte: new Date(startDate.toString()) };
        if (endDate)
            query['endDate'] = { $lte: new Date(endDate.toString()) };
        if (status)
            query['status'] = status;
        booking_1.default
            .find(query)
            .populate('userId', { 'firstName': 1, 'lastName': 1 })
            .exec((error, bookings) => {
            if (error) {
                return res.status(500).json({
                    err: error
                });
            }
            return res.status(201).json({ payload: bookings });
        });
    };
    BookingController.getOneBooking = (req, res, next) => {
        // get id
        const id = req.params.id;
        booking_1.default
            .findById({ _id: id })
            .sort({ dateBooked: -1 })
            .exec((err, booking) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            villa_1.default.findOne({
                _id: booking.villaId
            }, (err, villa) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                booking.villaId = villa;
                const data = {
                    booking,
                };
                return res.status(200).json({
                    payload: data
                });
            });
        });
    };
    BookingController.updateBooking = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const query = { ...body };
        delete query.userId;
        delete query.email;
        booking_1.default.findByIdAndUpdate({ _id: id }, query, { new: true }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: user
            });
        });
    };
})(BookingController = exports.BookingController || (exports.BookingController = {}));
