import { multer_logo } from './../middleware/util/multer.util';
import { Router } from "express";
import { ApplicationController } from '../controllers/application.controller';






const router = Router();

router.get('/get',ApplicationController.getApp);

router.post('/add', ApplicationController.addApp)

router.put('/update',ApplicationController.updateApp);

router.put('/updateLogo',multer_logo,ApplicationController.updateLogo);

export default router;