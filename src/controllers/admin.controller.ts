import { sendCustomEmail } from './../functions/emailer';
import {RequestHandler} from 'express';




export namespace AdminController{
    export const sendEmail: RequestHandler = (req, res, next) =>{
        const body = req.body;
        console.log(body)
                return res.status(200).json({
                key: 'SUCCESS',
                payload: 'data'
            })
        // sendCustomEmail(body)
        // .then((data)=>{
        //     return res.status(200).json({
        //         key: 'SUCCESS',
        //         payload: data
        //     })
        // })
        // .catch((error)=>{
        //     return res.status(500).json({
        //         key: 'ERROR',
        //         error: error
        //     })
        // })
    }
}
