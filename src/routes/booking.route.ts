import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { body } from 'express-validator';
import { BookingController } from '../controllers/booking.controller';
const router = Router();

router.post('/add',isAuth,[
    body('villaId').not().isEmpty(),
    body('startDate').not().isEmpty(),
    body('endDate').not().isEmpty(),
    body('bookingType').not().isEmpty(),
],BookingController.addBooking);
router.get('/get',isAuth,BookingController.getBookings);
router.get('/success',isAuth,BookingController.successPay);
router.post('/pay/:id',isAuth,BookingController.payBooking);
router.post('/webhook/add', BookingController.webhookAdd)
router.get('/webhook/get',BookingController.webhookGet);
router.get('/getOne/:id',isAuth, BookingController.getOneBooking);
router.put('/update/:id',isAuth, BookingController.updateBooking);


export default router