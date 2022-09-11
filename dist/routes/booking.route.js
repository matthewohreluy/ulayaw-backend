"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth_util_1 = require("./../middleware/util/isAuth.util");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const booking_controller_1 = require("../controllers/booking.controller");
const router = (0, express_1.Router)();
router.post('/add', isAuth_util_1.isAuth, [
    (0, express_validator_1.body)('villaId').not().isEmpty(),
    (0, express_validator_1.body)('startDate').not().isEmpty(),
    (0, express_validator_1.body)('endDate').not().isEmpty(),
    (0, express_validator_1.body)('bookingType').not().isEmpty(),
], booking_controller_1.BookingController.addBooking);
router.get('/get', isAuth_util_1.isAuth, booking_controller_1.BookingController.getBookings);
router.get('/getOne/:id', isAuth_util_1.isAuth);
router.put('/update/:id', isAuth_util_1.isAuth);
exports.default = router;
