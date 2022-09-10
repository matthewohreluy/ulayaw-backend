import { validationResult } from 'express-validator';
import {RequestHandler} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/user";


export namespace Auth{
    export const signup: RequestHandler = (req, res, next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({statusCode: 400, key: 'NOTVALIDATED',payload: errors});
        }
        const {
                email, 
                firstName, 
                lastName,
                password,
                contact,
                role
            } = req.body;
        bcrypt
        .hash(password, 12)
        .then(hashedPw =>{
            const user = new User({
                email: email,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                role: role
            });
            return user.save();
        })
        .then(result =>{
            res.status(201).json({message: 'User created!', userId: result._id})
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    };

    export const login: RequestHandler = (req, res, next) =>{
        const {
            email, 
            password,
        } = req.body;
        let loadedUser: any;
        User
        .findOne({email: email})
        .then((user: any)=>{
            if(!user){
                // const error = new Error('A user with this email could not be found.');
                res.status(401).json({statusCode: 400,key: 'USERNOTEXIST', payload: 'A user with this email could not be found.'});
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isPwEqual =>{
            if(!isPwEqual){
                // const error = new Error('Wrong password');
                res.status(401).json({key: 'WRONGPASSWORD', payload: 'Wrong password'});
            }
            const token = jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, 'longapiKey', {expiresIn: '1h'});
            res.status(200).json({token: token, userId: loadedUser._id.toString()});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    };

    
}