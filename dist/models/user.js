"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'New'
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    bookings: [{
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }]
});
exports.default = mongoose_1.default.model('User', userSchema);
