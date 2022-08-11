"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const feed_route_1 = __importDefault(require("./routes/feed.route"));
exports.routes = [
    ['/feed', feed_route_1.default]
];
