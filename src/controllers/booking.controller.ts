import { RequestHandler } from 'express';
import Booking from '../models/booking';
import Villa from '../models/villa';
import Paymongo from 'paymongo';
import { CronJob } from 'cron';

// before archive 1 year

let archiveJob = new CronJob({
    cronTime: '0 1 * * *',
    onTick: ()=>{
        let currentDate = new Date();
        let yearLessDate = currentDate.setDate(currentDate.getDate() - 365);
        let yearand3MonthsDate = currentDate.setDate(currentDate.getDate() - 455);
        Booking.updateMany({
            dateBooked: {
                $lt:yearLessDate
            }
        },
        {$set: {status:'Archived'}})

        Booking.deleteMany({
            dateBooked: {
                $lt:yearand3MonthsDate,
                status: 'Archived'
            }
        })
    }
})

// after 3 months

const paymongo = new Paymongo('sk_live_Gj6a42YVzY5jDPEiQHZcpSoW');


export namespace BookingController{
 
    export const payBooking: RequestHandler = async (req, res, next) =>{
        const id = req.params.id
        // async function listWebhooks () {
        //     return paymongo.webhooks.list();
        //   }

        // listWebhooks()
        // .then((result) => { console.log(result); })
        // .catch();
        const data ={
            data: {
                attributes: {
                  type: 'gcash',
                  amount: 10000, // PHP200,
                  currency: 'PHP',
                  redirect: {
                    success: 'http://localhost:8080/booking/success/payment/',
                    failed: 'https://www.google.com'
                  }
                }
              }
        }
       
        try{
            const result = await paymongo.sources.create(data);
            return res.status(200).json(result);
        }catch (error) {
            console.error(error);
          }
    }

    export const successPay: RequestHandler = async (req, res, next) =>{
        
    
        const data ='src_ahiUE6X7o8s7ecZc23ZPzt8i'
       
        try{
            const result = await paymongo.sources.retrieve(data);
            return res.status(200).json(result);
        }catch (error) {
            console.error(error);
          }
    }

    export const addBooking: RequestHandler = (req, res, next) =>{
        const {
            villaId,
            userId,
            startDate,
            endDate,
            bookingType,
            noOfGuests,
            totalAmount,
            addOns
        } = req.body;
        // validate startdate, enddate
        let startD = new Date(startDate).getTime()
        let endD = new Date(endDate).getTime()
        let todayD = new Date().getTime()
        if(startD > endD){
            return res.status(400)
            .json({error: 400, message: 'End date must not be less than to start date', key: 'INVALIDDATELOGIC'})
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
                status: 'Pending',
                bookingType,
                addOns
            })
            const booking = new Booking({
                villaId,
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                dateBooked: new Date(),
                isPaid: false,
                status: 'Pending',
                paymentType: 'Full',
                bookingType,
                addOns,
                noOfGuests,
                totalAmount,
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
       if(endDate) query['endDate'] = {$lte: new Date(endDate!.toString())}
       if(status) query['status'] = status
       Booking
       .find(query)
       .populate('userId', {'firstName': 1,'lastName': 1})
       .exec((error: any, bookings: any) =>{
        if(error){
            return res.status(500).json({
                err: error
                });
        }
        return res.status(201).json({payload: bookings})
   })
    }

    export const getOneBooking: RequestHandler = (req, res, next) => {
        // get id
        const id = req.params.id;
        Booking
        .findById({_id: id})
        .sort({dateBooked: -1})
        .exec((err: any, booking: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            Villa.findOne({
                _id: booking.villaId
            }, (err: any, villa: any)=>{
                if (err) {
                    return res.status(500).json({
                        err: err
                    });
                }
                booking.villaId = villa
                const data = {
                    booking,
                }
                return res.status(200).json({
                    payload: data
                })
            })
        })
        
    }

    export const updateBooking: RequestHandler = (req, res, next) =>{
        const id = req.params.id;
        const body = req.body;

        const query = {...body}
        delete query.userId;
        delete query.email;
        Booking.findByIdAndUpdate({_id: id}, query,{new: true}, (err: any, user: any)=>{
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