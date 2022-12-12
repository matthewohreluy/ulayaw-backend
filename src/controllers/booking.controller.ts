import { RequestHandler } from 'express';
import Booking from '../models/booking';
import Villa from '../models/villa';
import Paymongo from 'paymongo';
import { CronJob } from 'cron';
import QRCode from 'qrcode';

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

// const paymongo = new Paymongo('sk_test_rYiCsW2PbSTuDgVxYwX8y68a');
// const paymongo = new Paymongo('sk_live_Gj6a42YVzY5jDPEiQHZcpSoW');

const getPayMongoKey = (type: string) =>{
    if(type ==='test'){
        return 'sk_test_rYiCsW2PbSTuDgVxYwX8y68a';
    }else if(type === 'live'){
        return 'sk_live_Gj6a42YVzY5jDPEiQHZcpSoW';
    }else{
        return 'sk_test_rYiCsW2PbSTuDgVxYwX8y68a';
    }
}

export namespace BookingController{
    export const sourceGet: RequestHandler = async (req, res, next) =>{
        const id = req.params.id;
        const type = req.params.type;
        const paymongo = new Paymongo(getPayMongoKey(type));
        try{
            const result = await paymongo.sources.retrieve(id);
            return res.status(200).json(result);
        }catch (error) {
            return res.status(500).json(error);
          } 
    }

    export const webhookGet: RequestHandler = async (req, res, next) =>{
        const type = req.params.type;
        const paymongo = new Paymongo(getPayMongoKey(type));
        try{
            const result = await paymongo.webhooks.list();
            return res.status(200).json(result);
        }catch (error) {
            console.log(error);
            return res.status(500).json(error);
          } 
    }

    export const webhookAdd: RequestHandler = async (req, res, next) =>{
        let type = req.params.type;
        console.log(type);
        const paymongo = new Paymongo(getPayMongoKey(type));
        const data = {
            data: {
              attributes: {
                url: `https://ulayaw-app.azurewebsites.net/webhook/listen/${type}`, // Developer's note: this is unique in paymongo. You can't create multiple webhooks with same url.
                events: ['source.chargeable'] // The only event supported for now is 'source.chargeable'.
              }
            }
          }
         
          try{
            const result = await paymongo.webhooks.create(data);
            return res.status(200).json(result);
        }catch (error) {
            return res.status(500).json(error);
          }
    }

    export const webhookDisable: RequestHandler = async (req, res, next) =>{
        const type = req.params.type;
        const id = req.params.id
        const paymongo = new Paymongo(getPayMongoKey(type));
        const data = {
           id: id,
           action: 'disable'
          }
         
          try{
            const result = await paymongo.webhooks.toggle(data.id, data.action);
            console.log(result);
            console.log('test');
            return res.status(200).json(result);
        }catch (error) {
            console.log(error);
            return res.status(500).json(error);
          }
    }

    export const webhookListen: RequestHandler = async (req, res, next) =>{
        let type = req.params.type;
        const paymongo = new Paymongo(getPayMongoKey(type));
        console.log('data')
        if(!req || !req.body || !req.body.data || !req.body.data.attributes || !req.body.data.attributes.data){
            return  res.status(400).json({message:'Required Body Attribute Data'});
        }
        let sourceData = req.body.data.attributes.data;
        
        // create payment
        const data = {
            data: {
              attributes: {
                amount: sourceData.attributes.amount,
                currency: 'PHP',
                source: {
                  id: sourceData.id, // Id of the Source resource.
                  type: 'source', // 
                }
              }
            }
          }
        Booking.findOne({paymentId: sourceData.id}, async (error: any, booking1: any)=>{
            if(error){
                return res.status(500).json({
                    err: error
                });
            }
            const [qrCode, result] = await Promise.all([QRCode.toDataURL(`https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/c-receipt.html?id=${booking1._id}`),paymongo.payments.create(data) ])
            console.log(result);
            if(result.data.attributes.status === 'paid'){
                Booking.findOneAndUpdate({paymentId: sourceData.id}, {isPaid: true,qrCode: qrCode, datePaid: new Date() },{new: true}, (err: any, booking: any)=>{
                    if(err){
                        return res.status(500).json({
                            err: err
                        });
                    }
                    return res.status(200).json({message: 'Booking Paid', payload: booking});
                })
            }else{
                return res.status(400).json({message:'Payment Failed'});
            }
        }) 
        
        
    }
    
   
    export const payBooking: RequestHandler =  (req, res, next) =>{
        const type = req.params.type;
        const paymongo = new Paymongo(getPayMongoKey(type));
        const id = req.params.id
        const paymentType = req.body.paymentType;
        // find booking
        Booking.findById({_id: id}, async (err: any, booking: any)=>{
            if(err){
                return res.status(500).json({
                    err: err
                });
            }
            const amountToPay = paymentType === 'Full' ? booking.totalAmount : booking.totalAmount/2;
            const data ={
                data: {
                    attributes: {
                      type: 'gcash',
                      amount: amountToPay * 100, 
                      currency: 'PHP',
                      redirect: {
                        success: 'https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/success.html?id=' +id,
                        failed: 'https://ashy-coast-0c2d1cf00.1.azurestaticapps.net/failure.html'
                      }
                    }
                  }
            }
           
            try{
                const result = await paymongo.sources.create(data);
                // update booking attach paymentId
                Booking.findByIdAndUpdate({_id: id}, {paymentId: result.data.id, paymentType: paymentType },{new: true}, (err: any, booking: any)=>{
                    if(err){
                        return res.status(500).json({
                            err: err
                        });
                    }
                    return res.status(200).json(result);
                })
              
            }catch (error) {
                console.error(error);
              }
        })

       
    }

    // export const successPay: RequestHandler = async (req, res, next) =>{
        
    //     console.log('test');
    //     const data ='src_n4edYTf96NThzNDbKhgkN1YR'
        
    //     try{
    //         const result = await paymongo.sources.retrieve(data);
    //         return res.status(200).json(result);
    //     }catch (error) {
    //         console.error(error);
    //       }  
    // }

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
        if(bookingType !== 'overnight' && bookingType !== 'dayTour'){
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
        .populate('userId')
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