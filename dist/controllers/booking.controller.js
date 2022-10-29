"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const villa_1 = __importDefault(require("../models/villa"));
var BookingController;
(function (BookingController) {
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
                status: 'Active',
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
                status: 'Active',
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
                _id: id
            }, (err, villa) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                const data = {
                    ...booking,
                    villaId: villa
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
