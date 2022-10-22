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
            bookingType,
            price
        } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime()
        let endD = new Date(endDate).getTime()
        let todayD = new Date().getTime()
        if(startD >= endD){
            return res.status(400)
            .json({error: 400, message: 'End date must not be less than or equal to start date', key: 'INVALIDDATELOGIC'})
        }
        // startDate shoule b greater than today
        if(todayD > startD){
            return res.status(400)
            .json({error: 400, message: 'Start date should not be greater than today', key: 'INVALIDDATEHIST'})
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
                price,
                bookingType
            })
            booking.save((err, newBooking)=>{
                if(err){
                    return res.status(500).json({
                    err: err
                    });
                }
                return res.status(201).json({message: 'Booking created!', bookingId: newBooking._id})
            })  
        })
    }

    export const getBookings: RequestHandler = (req, res, next) =>{
        const {
            villaId,
            userId,
            startDate,
            endDate,
            status
        } = req.query
       const query: Record<string,any> = {};
       if(villaId) query['villaId'] = villaId
       if(userId) query['userId'] = userId
       if(startDate) query['startDate'] = {$gte: new Date(startDate!.toString())}
       if(endDate) query['endDate'] = {$gte: new Date(endDate!.toString())}
       if(status) query['status'] = status
       Booking.find(query,(error: any, bookings: any) =>{
            if(error){
                return res.status(500).json({
                    err: error
                    });
            }
            return res.status(201).json({payload: bookings})
       })
    }
}