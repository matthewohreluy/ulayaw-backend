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
    };
    VillaController.getVilla = (req, res, next) => {
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
})(VillaController = exports.VillaController || (exports.VillaController = {}));
