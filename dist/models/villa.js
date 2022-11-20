"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const villaDefinitionSchema = new Schema({
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
    imageURLs: {
        type: Array,
        default: []
    },
    note: {
        type: String,
        required: false
    }
});
const villaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: false
    },
    image2: {
        type: String,
        required: false
    },
    image3: {
        type: String,
        required: false
    },
    overnight: {
        type: villaDefinitionSchema,
        required: true
    },
    dayTour: {
        type: villaDefinitionSchema,
        required: true
    }
});
exports.default = mongoose_1.default.model('Villa', villaSchema);
