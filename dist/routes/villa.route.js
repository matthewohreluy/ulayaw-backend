"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const villa_controller_1 = require("../controllers/villa.controller");
const router = (0, express_1.Router)();
router.get('/getAll', villa_controller_1.VillaController.getVillas);
router.get('/getOne/:id', villa_controller_1.VillaController.getVilla);
router.post('/add', villa_controller_1.VillaController.addVilla);
exports.default = router;
