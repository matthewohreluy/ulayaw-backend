"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
var UserController;
(function (UserController) {
    UserController.getNonGuestUsers = (req, res, next) => {
        const searchKey = req.query.searchKey;
        const queryMaker = {
            status: { $ne: 'Deleted' },
        };
        queryMaker['role'] = { $ne: 'Guest' };
        if (searchKey) {
            queryMaker['$or'] = [
                {
                    firstName: { $regex: searchKey, '$options': 'i' }
                },
                {
                    lastName: { $regex: searchKey, '$options': 'i' }
                }
            ];
        }
        console.log(queryMaker);
        user_1.default.find(queryMaker, (err, user) => {
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
        user_1.default.findByIdAndUpdate({ _id: id }, { ...body, dateUpdated: new Date(), }, { new: true }, (err, user) => {
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
    UserController.getCustomerSatisfaction = (req, res, next) => {
        let queryMaker = {
            'feedback.description': { $ne: '' },
            'role': 'Guest',
        };
        user_1.default
            .find(queryMaker, (err, users) => {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: users
            });
        })
            .sort({ dateUpdated: -1 })
            .limit(10).then((users) => {
            console.log(users);
        });
    };
})(UserController = exports.UserController || (exports.UserController = {}));
