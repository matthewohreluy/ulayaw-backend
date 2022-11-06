import {RequestHandler} from 'express';
import Booking from '../models/booking';
import Moment from '../models/moment';




export namespace MomentController{
    export const getAll: RequestHandler = (req, res, next) =>{
        Moment.find({}, (err: any, moment: any)=>{
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: moment
            })
        })
    }

    export const upload: RequestHandler = (req, res, next) =>{
    //    console.log(req.file);
    //    return res.status(200).json(req.body)
    // check no. of bookings
    Booking.find({userId: req.body.userId}, (err: any, booking: any)=>{
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
    Moment.find({}, (err: any, moment: any)=>{
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        if(booking.length > moment.length){
            // upload moment
            const newMoment = new Moment({
                userId: req.body.userId,
                status: 'New',
                imageUrl: 'https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/moments' + req.file!.filename,
                description: req.body.description,
                dateUpdated: new Date()
            })
            newMoment.save((err, uploadedMoment)=>{
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                return res.status(200).json({
                    key: 'UPLOADSUCCESS',
                    message: 'User has sucessfully uploaded moment.',
                    moment: uploadedMoment
                })
            })
        }else{
            return res.status(500).json({
                key: 'NOTENOUGHBOOKING',
                message: 'User must book first to create moment'
            })
        }
    }) 
    })
    }
}
