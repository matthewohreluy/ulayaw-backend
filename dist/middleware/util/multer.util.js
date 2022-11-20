"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multer_logo = exports.multer_villa = exports.multer_moment = void 0;
const multer_1 = __importDefault(require("multer"));
const fileStorage_moments = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/static/moments');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
    }
});
exports.multer_moment = (0, multer_1.default)({
    storage: fileStorage_moments
}).single('file');
const fileStorage_image = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/static/villa');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname);
    }
});
exports.multer_villa = (0, multer_1.default)({
    storage: fileStorage_image
}).single('file');
const fileStorage_logo = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/static/logo');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        console.log('file');
        cb(null, new Date().getTime() + file.originalname);
    }
});
exports.multer_logo = (0, multer_1.default)({
    storage: fileStorage_logo
}).single('file');
