"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const momentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'New',
        required: true
    },
    remarks: {
        type: String,
        default: '',
        required: false
    },
    imageUrl: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false
    },
    dateUpdated: {
        type: Date,
        required: false
    }
});
exports.default = mongoose_1.default.model('Moment', momentSchema);
