"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const express_validator_1 = require("express-validator");
const hashcode_1 = require("../functions/hashcode");
const emailer_1 = require("./../functions/emailer");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
var Auth;
(function (Auth) {
    Auth.signup = (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, key: 'NOTVALIDATED', payload: errors });
        }
        const { email, firstName, lastName, password, contact, role } = req.body;
        // generate hashcode
        const code = (0, hashcode_1.generateCode)(6);
        bcrypt_1.default
            .hash(password, 12)
            .then(hashedPw => {
            const user = new user_1.default({
                email: email,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                role: role,
                code: code
            });
            return user.save();
        })
            .then(resultUser => {
            // send Email
            (0, emailer_1.sendEmail)(resultUser);
            return res.status(201).json({ message: 'User created!', user: resultUser, key: 'USERCREATED' });
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
        let loadedUser;
        user_1.default
            .findOne({ email: email })
            .then((user) => {
            if (!user) {
                // const error = new Error('A user with this email could not be found.');
                res.status(400).json({ statusCode: 400, key: 'USERNOTEXIST', payload: 'A user with this email could not be found.' });
            }
            loadedUser = user;
            return bcrypt_1.default.compare(password, user.password);
        })
            .then(isPwEqual => {
            if (!isPwEqual) {
                // const error = new Error('Wrong password');
                res.status(400).json({ statusCode: 400, key: 'WRONGPASSWORD', payload: 'Wrong password' });
            }
            const token = jsonwebtoken_1.default.sign({ email: loadedUser.email, userId: loadedUser._id.toString() }, 'longapiKey', { expiresIn: '1h' });
            return res.status(200).json({ token: token, userId: loadedUser._id.toString(), userRole: loadedUser.role });
        })
            .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    };
    Auth.verifyEmail = (req, res, next) => {
        const { code, userId, email } = req.body;
        // validate code
        if (!code) {
            return res.status(400)
                .json({ error: 400, message: 'Code is missing', key: 'NOCODEFIELD' });
        }
        user_1.default.findById(userId, (error, user) => {
            if (error) {
                return res.status(400)
                    .json({ error: error });
            }
            if (user.status === 'New') {
                if (code.toString() === user.code.toString()) {
                    // update
                    user_1.default.findOneAndUpdate({
                        _id: userId
                    }, {
                        $set: {
                            status: 'Verified'
                        }
                    }, {
                        upsert: true
                    }, (error, userUpdate) => {
                        if (error) {
                            return res.status(400)
                                .json({ error: error });
                        }
                        return res.status(200).json({ message: 'Account is now verified', key: 'ACCOUNTVERIFIED' });
                    });
                }
                else {
                    return res.status(400)
                        .json({ error: 400, message: 'Code does not match', key: 'CODEINVALID' });
                }
            }
            else if (user.status === 'Verified') {
                return res.status(400)
                    .json({ error: 400, message: 'Account is already verified', key: 'ACCOUNTALREADYVERIFIED' });
            }
        });
    };
})(Auth = exports.Auth || (exports.Auth = {}));
