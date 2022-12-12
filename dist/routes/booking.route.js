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
router.post('/pay/:id/:type', isAuth_util_1.isAuth, booking_controller_1.BookingController.payBooking);
router.get('/getOne/:id', booking_controller_1.BookingController.getOneBooking);
router.get('/source/:id/:type', booking_controller_1.BookingController.sourceGet);
router.put('/update/:id', isAuth_util_1.isAuth, booking_controller_1.BookingController.updateBooking);
router.post('/webhook/add/:type', booking_controller_1.BookingController.webhookAdd);
router.get('/webhook/disable/:id/:type', booking_controller_1.BookingController.webhookDisable);
router.get('/webhook/get/:type', booking_controller_1.BookingController.webhookGet); //test or live
exports.default = router;
