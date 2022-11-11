"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const app_1 = __importDefault(require("../models/app"));
var ApplicationController;
(function (ApplicationController) {
    ApplicationController.getApp = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const query = { ...body };
        app_1.default.findById({ _id: '636e5d86a8823d1bddddb65d' }, (err, application) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: application
            });
        });
    };
    ApplicationController.updateApp = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const query = { ...body };
        app_1.default.findByIdAndUpdate({ _id: '636e5d86a8823d1bddddb65d' }, query, { new: true }, (err, application) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: application
            });
        });
    };
    ApplicationController.addApp = (req, res, next) => {
        const id = req.params.id;
        const body = req.body;
        const query = { ...body };
        app_1.default.insertMany({
            contact: '1',
            location: '1',
            email: '1',
            fbLink: '1',
            instaLink: '1',
            businessLogo: '1'
        }, (err, app) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: app
            });
        });
    };
})(ApplicationController = exports.ApplicationController || (exports.ApplicationController = {}));
