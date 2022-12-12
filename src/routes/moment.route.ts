import { multer_moment } from './../middleware/util/multer.util';
import { isAuth } from '../middleware/util/isAuth.util';
import { Router } from "express";
import { MomentController } from '../controllers/moment.controller';


const router = Router();

router.get('/get',MomentController.getAll);
router.post('/upload', multer_moment,MomentController.upload);
router.put('/update/:id', isAuth,MomentController.updateMoment);

export default router;