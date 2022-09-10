"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VillaController = void 0;
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
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(201).json({ message: 'Villa created!', userId: newVilla._id });
        });
    };
})(VillaController = exports.VillaController || (exports.VillaController = {}));
