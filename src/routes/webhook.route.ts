import { Router } from "express";
import { BookingController } from '../controllers/booking.controller';
const router = Router();



router.post('/listen/:type', BookingController.webhookListen); //test or live


export default router