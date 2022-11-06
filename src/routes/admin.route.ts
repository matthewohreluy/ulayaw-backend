import { isAuth } from '../middleware/util/isAuth.util';
import { Router } from "express";
import { AdminController } from '../controllers/admin.controller';



const router = Router();

router.post('/email', isAuth,AdminController.sendEmail);


export default router;