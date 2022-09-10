import { RequestHandler } from 'express';
import Booking from '../models/booking';
import Villa from '../models/villa';


export namespace BookingController{
    export const addBooking: RequestHandler = (req, res, next) =>{
        const {
            villaId,
            userId,
            startDate,
            endDate,
            dateBooked,
            bookingType
        } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime()
        let endD = new Date(endDate).getTime()
        if(startD >= endD){
            return res.status(400)
            .json({error: 400, message: 'End date must not be less than or equal to start date', key: 'INVALIDDATE'})
        }
        // validatebookingType
        if(bookingType !== 'overnight' && bookingType !== 'daytour'){
            return res.status(400)
            .json({error: 400, message: 'Invalid booking type. keyword available: overnight or daytour', key: 'INVALIDBOOKINGTYPE'})
        }
        Villa.findById(villaId, (error: any, _villa: any)=>{
            if(error){
                return res.status(500).json({
                    err: error
                });
            }
            console.log({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Active',
                bookingType
            })
            const booking = new Booking({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Active',
                bookingType
            })
            booking.save((err, newBooking)=>{
                if(err){
                    console.log('error here');
                    return res.status(500).json({
                    err: err
                    });
                }
            return res.status(201).json({message: 'Booking created!', bookingId: newBooking._id})
            })
            
        })
        
    }
}