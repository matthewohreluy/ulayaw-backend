import { isAuth } from '../middleware/util/isAuth.util';
import { Router } from "express";
import { MomentController } from '../controllers/moment.controller';


const router = Router();

router.get('/all', isAuth,MomentController.getAll);
router.post('/upload', isAuth,MomentController.upload);

export default router;