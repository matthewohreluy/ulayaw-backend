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
        const { villaId, userId, startDate, endDate, dateBooked, bookingType } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime();
        let endD = new Date(endDate).getTime();
        if (startD >= endD) {
            return res.status(400)
                .json({ error: 400, message: 'End date must not be less than or equal to start date', key: 'INVALIDDATE' });
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
                bookingType
            });
            const booking = new booking_1.default({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Active',
                bookingType
            });
            booking.save((err, newBooking) => {
                if (err) {
                    console.log('error here');
                    return res.status(500).json({
                        err: err
                    });
                }
                return res.status(201).json({ message: 'Booking created!', bookingId: newBooking._id });
            });
        });
    };
})(BookingController = exports.BookingController || (exports.BookingController = {}));
