"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const feed_route_1 = __importDefault(require("./feed.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const villa_route_1 = __importDefault(require("./villa.route"));
const booking_route_1 = __importDefault(require("./booking.route"));
exports.routes = [
    ['/feed', feed_route_1.default],
    ['/auth', auth_route_1.default],
    ['/villa', villa_route_1.default],
    ['/booking', booking_route_1.default],
];
