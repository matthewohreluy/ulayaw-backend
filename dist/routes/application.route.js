"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = require("../controllers/application.controller");
const router = (0, express_1.Router)();
router.get('/get', application_controller_1.ApplicationController.getApp);
router.post('/add', application_controller_1.ApplicationController.addApp);
router.put('/update', application_controller_1.ApplicationController.updateApp);
exports.default = router;
