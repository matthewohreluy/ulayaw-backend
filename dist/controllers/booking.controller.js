"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const villa_1 = __importDefault(require("../models/villa"));
const paymongo_1 = __importDefault(require("paymongo"));
const paymongo = new paymongo_1.default('sk_test_5pYcXMAsP3rWCERk6A8yDDTs');
var BookingController;
(function (BookingController) {
    BookingController.payBooking = async (req, res, next) => {
        const id = req.params.id;
        // async function listWebhooks () {
        //     return paymongo.webhooks.list();
        //   }
        // listWebhooks()
        // .then((result) => { console.log(result); })
        // .catch();
        const data = {
            data: {
                attributes: {
                    type: 'gcash',
                    amount: 10000,
                    currency: 'PHP',
                    redirect: {
                        success: 'http://localhost:8080/booking/success/payment/',
                        failed: 'https://www.google.com'
                    }
                }
            }
        };
        try {
            const result = await paymongo.sources.create(data);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
        }
    };
    BookingController.successPay = async (req, res, next) => {
        const data = 'src_ahiUE6X7o8s7ecZc23ZPzt8i';
        try {
            const result = await paymongo.sources.retrieve(data);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error(error);
        }
    };
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
            query['endDate'] = { $gte: new Date(endDate.toString()) };
        if (status)
            query['status'] = status;
        booking_1.default.find(query, (error, bookings) => {
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
        booking_1.default.findById({ _id: id }, (err, booking) => {
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
