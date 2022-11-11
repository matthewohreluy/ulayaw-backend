import { isAuth } from './../middleware/util/isAuth.util';
import { Router } from "express";
import { ApplicationController } from '../controllers/application.controller';






const router = Router();

router.get('/get',ApplicationController.getApp);

router.post('/add', ApplicationController.addApp)

router.put('/update',ApplicationController.updateApp);

export default router;