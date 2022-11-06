import { Router } from "express";
import { AdminController } from '../controllers/admin.controller';



const router = Router();

router.post('/email',AdminController.sendEmail);


export default router;