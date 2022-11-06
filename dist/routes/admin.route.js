"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_util_1 = require("../middleware/util/isAuth.util");
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.post('/email', isAuth_util_1.isAuth, admin_controller_1.AdminController.sendEmail);
exports.default = router;
