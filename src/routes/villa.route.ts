import { Router } from "express";
import { VillaController } from "../controllers/villa.controller";





const router = Router();

router.get('/getAll',VillaController.getVillas);

router.get('/getOne/:id', VillaController.getVilla);

router.post('/add', VillaController.addVilla);

export default router;