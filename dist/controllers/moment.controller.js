"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MomentController = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const moment_1 = __importDefault(require("../models/moment"));
var MomentController;
(function (MomentController) {
    MomentController.getAll = (req, res, next) => {
        const status = req.body.status;
        let query = {};
        if (status) {
            query = {
                status: status
            };
        }
        moment_1.default
            .find(query)
            .populate('userId', { 'firstName': 1, 'lastName': 1 })
            .sort({ dateUpdated: -1 })
            .exec((err, moment) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: moment
            });
        });
    };
    MomentController.upload = (req, res, next) => {
        booking_1.default.find({ userId: req.body.userId }, (err, booking) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            moment_1.default.find({ userId: req.body.userId }, (err, moment) => {
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                console.log(req);
                if (booking.length > moment.length) {
                    // upload moment
                    const newMoment = new moment_1.default({
                        userId: req.body.userId,
                        status: 'New',
                        imageUrl: 'https://ulayaw-backend.herokuapp.com/moments/' + req.file.filename,
                        description: req.body.description,
                        dateUpdated: new Date()
                    });
                    newMoment.save((err, uploadedMoment) => {
                        if (err) {
                            return res.status(500).json({
                                err: err
                            });
                        }
                        return res.status(200).json({
                            key: 'UPLOADSUCCESS',
                            message: 'User has sucessfully uploaded moment.',
                            moment: uploadedMoment
                        });
                    });
                }
                else {
                    return res.status(500).json({
                        key: 'NOTENOUGHBOOKING',
                        message: 'User must book first to create moment'
                    });
                }
            });
        });
    };
    MomentController.updateMoment = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        moment_1.default.findByIdAndUpdate({ _id: id }, { status: req.body.status, remarks: req.body.remarks }, { new: true }, (err, user) => {
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
})(MomentController = exports.MomentController || (exports.MomentController = {}));
