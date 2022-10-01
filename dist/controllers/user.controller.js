"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
var UserController;
(function (UserController) {
    UserController.getUsers = (req, res, next) => {
        const query = req.query;
    };
    UserController.getOne = (req, res, next) => {
        // get id
        const id = req.params.id;
        user_1.default.findById({ _id: id }, (err, user) => {
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
    UserController.updateOne = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        user_1.default.findByIdAndUpdate({ _id: id }, { ...body }, { new: true }, (err, user) => {
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
})(UserController = exports.UserController || (exports.UserController = {}));
