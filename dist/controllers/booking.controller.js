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
        const { villaId, userId, startDate, endDate, bookingType, price, addOns } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime();
        let endD = new Date(endDate).getTime();
        let todayD = new Date().getTime();
        if (startD >= endD) {
            return res.status(400)
                .json({ error: 400, message: 'End date must not be less than or equal to start date', key: 'INVALIDDATELOGIC' });
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
                price,
                bookingType,
                addOns
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
})(BookingController = exports.BookingController || (exports.BookingController = {}));
