import {RequestHandler} from 'express';
import Booking from '../models/booking';
import Moment from '../models/moment';




export namespace MomentController{
    export const getAll: RequestHandler = (req, res, next) =>{
        const status = req.body.status
        let query = {}
        if(status){
            query = {
                status: status
            }
        }
        Moment
        .find(query)
        .populate('userId', {'firstName': 1,'lastName': 1})
        .sort({dateUpdated:-1})
        .exec((err: any, moment: any)=>{
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
    Booking.find({userId: req.body.userId}, (err: any, booking: any)=>{
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
    Moment.find({userId: req.body.userId}, (err: any, moment: any)=>{
        if (err) {
            return res.status(500).json({
                err: err
            });
        }
        console.log(req);
        if(booking.length > moment.length){
            // upload moment
            const newMoment = new Moment({
                userId: req.body.userId,
                status: 'New',
                imageUrl: 'https://ulayaw-backend.herokuapp.com/moments/' + req.file!.filename,
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

    export const updateMoment: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;
        Moment.findByIdAndUpdate({_id: id}, {status: req.body.status, remarks: req.body.remarks},{new: true}, (err: any, user: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: user
            })
        })
    }
}
