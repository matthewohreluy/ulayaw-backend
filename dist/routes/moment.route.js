"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_util_1 = require("../middleware/util/isAuth.util");
const express_1 = require("express");
const moment_controller_1 = require("../controllers/moment.controller");
const router = (0, express_1.Router)();
router.get('/all', isAuth_util_1.isAuth, moment_controller_1.MomentController.getAll);
router.post('/upload', isAuth_util_1.isAuth, moment_controller_1.MomentController.upload);
exports.default = router;
