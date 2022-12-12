"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test2 = exports.test = void 0;
const multer_util_1 = require("./../middleware/util/multer.util");
const isAuth_util_1 = require("./../middleware/util/isAuth.util");
const express_1 = require("express");
const villa_controller_1 = require("../controllers/villa.controller");
const test = (req, res, next) => {
    req.body.add = 'test';
    next();
};
exports.test = test;
const test2 = (req, res, next) => {
    console.log(req.body.add);
    next();
};
exports.test2 = test2;
const router = (0, express_1.Router)();
router.get('/getAll', exports.test, exports.test2, villa_controller_1.VillaController.getVillas);
router.get('/getAvailable', villa_controller_1.VillaController.getAvailableVillas);
router.get('/getOne/:id', villa_controller_1.VillaController.getVilla);
router.post('/add', villa_controller_1.VillaController.addVilla);
router.put('/update/:id', isAuth_util_1.isAuth, villa_controller_1.VillaController.updateVilla);
router.post('/updateImage/:id', isAuth_util_1.isAuth, multer_util_1.multer_villa, villa_controller_1.VillaController.updateImageVilla);
exports.default = router;
