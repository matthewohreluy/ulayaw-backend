"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_util_1 = require("./../middleware/util/isAuth.util");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.put('/signup', [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
        return user_1.default.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address already exists!');
            }
        });
    })
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 5 }),
    (0, express_validator_1.body)('firstName')
        .trim()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)('lastName')
        .trim()
        .not()
        .isEmpty(),
], auth_controller_1.Auth.signup);
router.post('/login', auth_controller_1.Auth.login);
router.post('/verifyEmail', isAuth_util_1.isAuth, auth_controller_1.Auth.verifyEmail);
exports.default = router;
