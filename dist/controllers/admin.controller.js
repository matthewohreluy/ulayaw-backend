"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const emailer_1 = require("./../functions/emailer");
var AdminController;
(function (AdminController) {
    AdminController.sendEmail = (req, res, next) => {
        const body = req.body;
        (0, emailer_1.sendCustomEmail)(body)
            .then((data) => {
            return res.status(200).json({
                key: 'SUCCESS',
                payload: data
            });
        })
            .catch((error) => {
            return res.status(500).json({
                key: 'ERROR',
                error: error
            });
        });
    };
})(AdminController = exports.AdminController || (exports.AdminController = {}));
