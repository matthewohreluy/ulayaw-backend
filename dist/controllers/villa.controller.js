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
                const bookingType = (startDate === endDate) ? 'dayTour' : 'overnight';
                const toStringQuery = `${bookingType}.minPerson`;
                const queryVilla = {
                    _id: { $nin: unavailableVillas },
                    [toStringQuery]: { $gte: Number(guests) }
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
    VillaController.updateVilla = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const query = { ...body };
        delete query.userId;
        delete query.email;
        villa_1.default.findByIdAndUpdate({ _id: id }, query, { new: true }, (err, user) => {
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
    VillaController.updateImageVilla = (req, res, next) => {
        const id = req.params.id;
        let propertyName = req.body.type;
        console.log(req.body);
        if (propertyName === 'image1' || propertyName === 'image2' || propertyName === 'image3') {
            villa_1.default.findOneAndUpdate({ _id: id }, {
                [propertyName]: 'https://ulayaw-backend.herokuapp.com/villa/' + req.file.filename
            }, { new: true }, (err, villa) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                return res.status(200).json({
                    payload: villa,
                    key: 'UPDATEVILLAIMAGESUCCESS'
                });
            });
        }
        else {
            return res.status(500).json({
                message: 'Image cannot be uploaded'
            });
        }
    };
})(VillaController = exports.VillaController || (exports.VillaController = {}));
