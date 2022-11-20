import {RequestHandler} from 'express';
import Booking from '../models/booking';
import Villa from '../models/villa';



export namespace VillaController{
    export const getVillas: RequestHandler = (req, res, next) =>{
        Villa.find({}, (err: any, villas: any)=>{
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villas
            })
        })
    }

    export const getVilla: RequestHandler = (req, res, next) => {
        const id = req.params.id;
        Villa.findOne({
            _id: id
        }, (err: any, villa: any)=>{
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            return res.status(200).json({
                payload: villa
            })
        })
    }
    
    export const addVilla: RequestHandler = (req, res, next) =>{
        const villa = new Villa({...req.body});
        villa.save((err, newVilla)=>{
            if(err){
                next(err)
            }
        return res.status(201).json({message: 'Villa created!', villaId: newVilla._id})
        })
        
    }

    export const getAvailableVillas: RequestHandler = (req, res, next) =>{
        const {
            startDate,
            endDate,
            guests
        } = req.query;
        // check bookings
        let query = [
            {
                $match:{
                    $or:[
                     {$and:[
                            {'startDate':{$gte: new Date(startDate!.toString())}},
                            {'startDate':{$lte: new Date(endDate!.toString())}}
                        ]},
                    {$and:[
                            {'endDate':{$gte: new Date(startDate!.toString())}},
                            {'endDate':{$lte: new Date(endDate!.toString())}}
                        ]}
                        ]
                       },      
            },
            {
                $group:{_id: "$villaId"}
            }
        ]
        Booking.aggregate(query, (error: any, bookings: any)=>{
            if(error){
                return res.status(500).json({
                    error: error
                });
            }
            if(bookings){
              const unavailableVillas = bookings.map((booking: any)=>booking._id)
              const bookingType = (startDate === endDate) ? 'dayTour' : 'overnight'
              const toStringQuery = `${bookingType}.minPerson`
              const queryVilla: Record<any, any> = {
                _id: {$nin: unavailableVillas},
                [toStringQuery]: {$gte: Number(guests)}
                }
                console.log(queryVilla);
              Villa.find(queryVilla, (err: any, villas: any)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    villas: villas
                });
              })
            }
        })
    }

    export const updateVilla: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;
        const query = {...body}
        delete query.userId;
        delete query.email;
        Villa.findByIdAndUpdate({_id: id}, query,{new: true}, (err: any, user: any)=>{
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

    export const updateImageVilla: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        let propertyName = '';
        let propertyValue = '';
        for(let key in req.body.data){
            if(key === 'image1' || key === 'image2' || key === 'image3'){
                propertyName = key;
                propertyValue = req.body.data[key];
            }
        }
        if(propertyName){
            Villa.findOneAndUpdate({_id: id}, {
                [propertyName]: 'https://ulayaw-backend.herokuapp.com/moments/' + req.file!.filename
            },{new: true}, (err: any, user: any)=>{
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
            })
        }else{
            return res.status(500).json({
                message: 'Image cannot be uploaded'
            })
        }
        
    }

}
