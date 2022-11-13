import { Router } from "express";
import { BookingController } from '../controllers/booking.controller';
const router = Router();



router.post('/listen', BookingController.webhookListen)

export default router