import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: 'New'
    },
    password:{
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
    contact:{
        type: String,
        required: true
    },
    feedback:{
        rating: {
            type: Number,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        isAnonymous: {
            type: Boolean,
            required: false
        }
    },
    role:{
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        required: true,
    },
    dateUpdated: {
        type: Date,
        required: true
    },
    bookings:[{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

export default mongoose.model('User', userSchema);