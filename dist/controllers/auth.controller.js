"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
var Auth;
(function (Auth) {
    Auth.signup = (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, key: 'NOTVALIDATED', payload: errors });
        }
        const { email, firstName, lastName, password, contact, role } = req.body;
        bcrypt_1.default
            .hash(password, 12)
            .then(hashedPw => {
            const user = new user_1.default({
                email: email,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                role: role
            });
            return user.save();
        })
            .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
    Auth.login = (req, res, next) => {
        const { email, password, } = req.body;
        user_1.default
            .findOne({ email: email })
            .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                return res.status(401).json({ statusCode: 400, key: 'USERNOTEXIST', payload: error });
            }
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
})(Auth = exports.Auth || (exports.Auth = {}));
