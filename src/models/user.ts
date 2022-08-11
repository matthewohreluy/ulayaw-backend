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
    role:{
        type: String,
        required: true
    },
    bookings:[{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }]
});

export default mongoose.model('User', userSchema);