import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { body } from 'express-validator';

import User from "../models/user";
import { Auth } from "../controllers/auth.controller";

const router = Router();

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, { req })=>{
        return User.findOne({email: value}).then(userDoc =>{
            if(userDoc){
                return Promise.reject('E-mail address already exists!');
            }
        })
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min:5}),
    body('firstName')
    .trim()
    .not()
    .isEmpty(),
    body('lastName')
    .trim()
    .not()
    .isEmpty(),
], Auth.signup);

router.post('/login', Auth.login);

router.post('/verifyEmail',isAuth,Auth.verifyEmail);

export default router;