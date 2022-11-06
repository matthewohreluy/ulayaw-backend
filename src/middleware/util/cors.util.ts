import {RequestHandler} from 'express';

export const cors: RequestHandler = (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,Access-Control-Allow-Origin');
    next();
}