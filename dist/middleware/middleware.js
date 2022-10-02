"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const error_util_1 = require("./util/error.util");
const body_parser_1 = require("body-parser");
const cors_util_1 = require("./util/cors.util");
const static_util_1 = require("./util/static.util");
exports.middleware = [
    (0, body_parser_1.json)(),
    cors_util_1.cors,
    error_util_1.error,
    static_util_1.staticFiles
];
