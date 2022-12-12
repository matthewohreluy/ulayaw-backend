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
router.post('/pay/:id/:type',isAuth,BookingController.payBooking);
router.get('/getOne/:id', BookingController.getOneBooking);
router.get('/source/:id/:type', BookingController.sourceGet);
router.put('/update/:id',isAuth, BookingController.updateBooking);
router.post('/webhook/add/:type', BookingController.webhookAdd);
router.get('/webhook/disable/:id/:type', BookingController.webhookDisable);
router.get('/webhook/get/:type',BookingController.webhookGet); //test or live
export default router