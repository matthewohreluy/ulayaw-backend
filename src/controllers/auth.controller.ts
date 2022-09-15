import { validationResult } from 'express-validator';
import {RequestHandler} from 'express';
import { generateCode } from '../functions/hashcode';
import { sendEmail } from './../functions/emailer';

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
        // generate hashcode
        const code = generateCode(6);
        bcrypt
        .hash(password, 12)
        .then(hashedPw =>{
            const user = new User({
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
        .then(resultUser =>{
            // send Email
            sendEmail(resultUser)
            return res.status(201).json({message: 'User created!', userId: resultUser._id, key: 'USERCREATED'})
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
                res.status(400).json({statusCode: 400,key: 'USERNOTEXIST', payload: 'A user with this email could not be found.'});
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isPwEqual =>{
            if(!isPwEqual){
                // const error = new Error('Wrong password');
                res.status(400).json({statusCode: 400, key: 'WRONGPASSWORD', payload: 'Wrong password'});
            }
            const token = jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, 'longapiKey', {expiresIn: '1h'});
            return res.status(200).json({token: token, userId: loadedUser._id.toString(), userRole: loadedUser.role});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    };

    export const verifyEmail: RequestHandler = (req, res, next) =>{
        const {
            code,
            userId,
            email
        } = req.body;
        // validate code
        if(!code){
            return res.status(400)
            .json({error: 400, message: 'Code is missing', key: 'NOCODEFIELD'})
        }
        User.findById(userId,(error: any,user: any)=>{
            if(error){
                return res.status(400)
                .json({error: error})
            }
            if(user.status === 'New'){
                if(code.toString() === user.code.toString()){
                    // update
                    User.findOneAndUpdate(
                        {
                            _id: userId
                        },
                        {
                            $set:{
                                status: 'Verified'
                            }
                        },
                        {
                            upsert: true
                        },
                        (error: any, userUpdate: any)=>{
                            if(error){
                                return res.status(400)
                                .json({error: error})
                            }
                            return res.status(200).json({message: 'Account is now verified', key:'ACCOUNTVERIFIED'})
                        })
                }
                else{
                    return res.status(400)
                .json({error: 400, message: 'Code does not match', key: 'CODEINVALID'})
                }
            }else
            if(user.status === 'Verified'){
                return res.status(400)
                .json({error: 400, message: 'Account is already verified', key: 'ACCOUNTALREADYVERIFIED'})
            }
        })
    }
}