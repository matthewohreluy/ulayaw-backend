"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
// routes
const feed_route_1 = __importDefault(require("./routes/feed.route"));
const cors_util_1 = require("./util/cors.util");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(cors_util_1.cors);
app.use('/feed', feed_route_1.default);
app.listen(8080);
