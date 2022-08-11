import {RequestHandler} from 'express';

export const error = (error: any,req: any, res:any, next: any) =>{
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
    next();
}