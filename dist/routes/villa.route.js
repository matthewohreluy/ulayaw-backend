"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_util_1 = require("./../middleware/util/isAuth.util");
const express_1 = require("express");
const villa_controller_1 = require("../controllers/villa.controller");
const router = (0, express_1.Router)();
router.get('/getAll', villa_controller_1.VillaController.getVillas);
router.get('/getAvailable', villa_controller_1.VillaController.getAvailableVillas);
router.get('/getOne/:id', villa_controller_1.VillaController.getVilla);
router.post('/add', villa_controller_1.VillaController.addVilla);
router.put('/update/:id', isAuth_util_1.isAuth, villa_controller_1.VillaController.updateVilla);
router.post('updateImage/:id', isAuth_util_1.isAuth, villa_controller_1.VillaController.updateImageVilla);
exports.default = router;
