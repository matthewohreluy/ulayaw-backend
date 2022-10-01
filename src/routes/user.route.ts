import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { UserController } from "../controllers/user.controller";



const router = Router();

router.get('/getAll', isAuth,UserController.getUsers);

router.get('/getOne/:id',isAuth, UserController.getOne)

router.put('/updateOne/:id',isAuth, UserController.updateOne);

export default router;