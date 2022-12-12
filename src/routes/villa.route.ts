import { multer_villa } from './../middleware/util/multer.util';
import { isAuth } from './../middleware/util/isAuth.util';
import { RequestHandler, Router } from "express";
import { VillaController } from "../controllers/villa.controller";




export const test: RequestHandler = (req, res, next) =>{
    req.body.add = 'test';
    next();
 }

 
export const test2: RequestHandler = (req, res, next) =>{
    console.log(req.body.add);
    next();
 }



const router = Router();

router.get('/getAll',test,test2,VillaController.getVillas);

router.get('/getAvailable', VillaController.getAvailableVillas)

router.get('/getOne/:id', VillaController.getVilla);

router.post('/add', VillaController.addVilla);

router.put('/update/:id',isAuth,VillaController.updateVilla);

router.post('/updateImage/:id', isAuth,multer_villa, VillaController.updateImageVilla);

export default router;


