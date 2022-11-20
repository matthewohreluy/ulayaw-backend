import { multer_villa } from './../middleware/util/multer.util';
import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { VillaController } from "../controllers/villa.controller";





const router = Router();

router.get('/getAll',VillaController.getVillas);

router.get('/getAvailable', VillaController.getAvailableVillas)

router.get('/getOne/:id', VillaController.getVilla);

router.post('/add', VillaController.addVilla);

router.put('/update/:id',isAuth,VillaController.updateVilla);

router.post('/updateImage/:id', isAuth,multer_villa, VillaController.updateImageVilla);

export default router;