"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const body_parser_1 = require("body-parser");
const cors_util_1 = require("./util/cors.util");
exports.middleware = [
    (0, body_parser_1.json)(),
    cors_util_1.cors
];
