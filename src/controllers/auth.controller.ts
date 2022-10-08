import { generatePassword } from './../functions/hashcode';
import { validationResult } from 'express-validator';
import {RequestHandler} from 'express';
import { generateCode } from '../functions/hashcode';
import { sendEmail } from './../functions/emailer';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

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
        // check if role is guest
        let status = 'New';
        if(role === 'Guest'){
            status = 'Verified';
        }
        bcrypt
        .hash(password, 12)
        .then(hashedPw =>{
            const user = new User({
                email: email,
                status: status,
                password: hashedPw,
                firstName: firstName,
                lastName: lastName,
                contact: contact,
                role: role,
                code: code,
                dateCreated: new Date(),
                dateUpdated: new Date(),
                feedback:{
                    rating: 0,
                    description: '',
                    isAnonymous: false
                }
            });
            return user.save();
        })
        .then(resultUser =>{
            // send Email
            // create html
            let readStream = fs.readFileSync(
                "./src/html/c-emailcode.html",
                "utf8"
              );
            let html = readStream.toString();
            html = html
                    .replace("{firstname}", resultUser.firstName)
                    .replace("{code}", resultUser.code);
            sendEmail(resultUser, html)
            return res.status(201).json({message: 'User created!', user: resultUser, key: 'USERCREATED'})
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
               return false
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isPwEqual =>{
            if(!isPwEqual){
                // const error = new Error('Wrong password');
               return res.status(400).json({statusCode: 400, key: 'WRONGPASSWORD', payload: 'Wrong password'});
            }
            const token = jwt.sign({email: loadedUser.email, userId: loadedUser._id.toString()}, 'longapiKey', {expiresIn: '365d'});
            return res.status(200).json({token: token, user: loadedUser, userRole: loadedUser.role});
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
                                status: 'Verified',
                                dateUpdated: new Date(),
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

    export const forgotPassword: RequestHandler = (req, res, next) =>{
        const {email} = req.body;
        const password = generatePassword(8);
        // send email passcode
        console.log(password);
        console.log('hi')
        console.log(email);
       bcrypt
        .hash(password, 12)
        .then(hashedPw =>{
            User.findOneAndUpdate({email: email}, {dateUpdated: new Date(),password: hashedPw},{new: true}, (err: any, user: any)=>{
                if(err){
                    console.log('error');
                    return res.status(500).json({
                        err: err
                    });
                }
                let readStream = fs.readFileSync(
                    "./src/html/c-forgotpass.html",
                    "utf8"
                  );
                let html = readStream.toString();
                html = html
                        .replace("{firstname}", user.firstName)
                        .replace("{code}", password);
                sendEmail(user, html)
                return res.status(200).json({user: user, key: 'PASSUPDATED'})
        })
    })
    }

    export const changePassword: RequestHandler = (req, res, next) =>{
        const {userId, oldPassword, newPassword} = req.body;
        
        const password = generatePassword(8);
        User
        .findOne({_id: userId})
        .then((user: any)=>{
            if(!user){
                // const error = new Error('A user with this email could not be found.');
                res.status(400).json({statusCode: 400,key: 'USERNOTEXIST', payload: 'A user with this email could not be found.'});
                return false
            }
            let loadedUser = user;
            return bcrypt.compare(oldPassword, user.password);
        })
        .then(isPwEqual =>{
            if(!isPwEqual){
                // const error = new Error('Wrong password');
                return res.status(400).json({statusCode: 400, key: 'WRONGPASSWORD', payload: 'Wrong old password'});
            }else{
                bcrypt
                    .hash(newPassword, 12)
                    .then(hashedPw =>{
                        User.findByIdAndUpdate({_id: userId}, {dateUpdated: new Date(),password: hashedPw},{new: true}, (err: any, user: any)=>{
                            if(err){
                                return res.status(500).json({
                                    err: err
                                });
                            }
                            return res.status(200).json({user: user, key: 'PASSUPDATED'})
                    })
                })
            }
            
        })
    }
}