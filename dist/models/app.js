"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const applicationSchema = new Schema({
    contact: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    fbLink: {
        type: String,
        required: false
    },
    instaLink: {
        type: String,
        required: false
    },
    businessLogo: {
        type: String,
        required: false
    },
});
exports.default = mongoose_1.default.model('Application', applicationSchema);
