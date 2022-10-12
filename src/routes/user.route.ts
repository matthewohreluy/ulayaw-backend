import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { UserController } from "../controllers/user.controller";



const router = Router();

router.get('/getNonGuests', isAuth,UserController.getNonGuestUsers);

router.get('/getOne/:id',isAuth, UserController.getOne);

router.get('/customerSatisfaction', UserController.getCustomerSatisfaction);

router.put('/updateOne/:id',isAuth, UserController.updateOne);

export default router;