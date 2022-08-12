"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const villaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    minPerson: {
        type: Number,
        required: true
    },
    maxPerson: {
        type: Number,
        required: true,
    },
    checkInTime: {
        type: String,
        required: true,
    },
    checkOutTime: {
        type: String,
        required: true,
    },
    inclusions: {
        type: Array,
        default: []
    },
    ammenities: {
        type: Array,
        default: []
    },
    addOns: {
        type: Array,
        default: []
    },
    imagURLs: {
        type: Array,
        default: []
    },
    note: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model('Villa', villaSchema);
