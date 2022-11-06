"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookingSchema = new Schema({
    bookingId: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Booking', bookingSchema);
