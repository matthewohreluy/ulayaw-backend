"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bookingSchema = new Schema({
    villaId: {
        type: Schema.Types.ObjectId,
        ref: 'Villa',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: {
        type: String,
        required: false
    },
    qrCode: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    dateBooked: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        required: true
    },
    bookingType: {
        type: String,
        required: true
    },
    noOfGuests: {
        type: Number,
        required: true,
        default: 0
    },
    paymentType: {
        type: String,
        required: true,
        default: 'Full'
    },
    datePaid: {
        type: Date,
        required: false
    },
    addOns: [
        {
            type: Schema.Types.Mixed,
            required: false
        }
    ],
    totalAmount: {
        type: Number
    },
    remarks: {
        type: String,
        required: false,
        default: ''
    }
});
exports.default = mongoose_1.default.model('Booking', bookingSchema);
