"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const villa_1 = __importDefault(require("../models/villa"));
var VillaController;
(function (VillaController) {
    VillaController.getVillas = (req, res, next) => {
        villa_1.default.find({}, (err, villas) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villas
            });
        });
    };
    VillaController.getVilla = (req, res, next) => {
        const id = req.params.id;
        villa_1.default.findOne({
            _id: id
        }, (err, villa) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villa
            });
        });
    };
    VillaController.addVilla = (req, res, next) => {
        const villa = new villa_1.default({ ...req.body });
        villa.save((err, newVilla) => {
            if (err) {
                next(err);
            }
            return res.status(201).json({ message: 'Villa created!', villaId: newVilla._id });
        });
    };
    VillaController.getAvailableVillas = (req, res, next) => {
        const { startDate, endDate, guests } = req.query;
        // check bookings
        let query = [
            {
                $match: {
                    $or: [
                        { $and: [
                                { 'startDate': { $gte: new Date(startDate.toString()) } },
                                { 'startDate': { $lte: new Date(endDate.toString()) } }
                            ] },
                        { $and: [
                                { 'endDate': { $gte: new Date(startDate.toString()) } },
                                { 'endDate': { $lte: new Date(endDate.toString()) } }
                            ] }
                    ]
                },
            },
            {
                $group: { _id: "$villaId" }
            }
        ];
        booking_1.default.aggregate(query, (error, bookings) => {
            if (error) {
                return res.status(500).json({
                    error: error
                });
            }
            if (bookings) {
                const unavailableVillas = bookings.map((booking) => booking._id);
                const bookingType = (startDate === endDate) ? 'dayTour': 'overnight';
                console.log(bookingType);
                const toStringQuery = `${bookingType}.minPerson`;
                const toStringQuery2 = `${bookingType}.maxPerson`;
                const queryVilla = {
                    _id: { $nin: unavailableVillas },
                    // [toStringQuery]: { $lte: Number(guests) },
                    [toStringQuery2]: { $gte: Number(guests) },
                };
                console.log(queryVilla);
                villa_1.default.find(queryVilla, (err, villas) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    return res.status(200).json({
                        villas: villas
                    });
                });
            }
        });
    };
})(VillaController = exports.VillaController || (exports.VillaController = {}));
