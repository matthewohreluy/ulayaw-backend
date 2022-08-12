import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
   villa:{
    type: Schema.Types.ObjectId,
    ref: 'Villa',
    required: true
   },
   user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
   },
   refNo: {
    type: String,
    required: true
   },
   startDate:{
    type: Date,
    required: true
   },
   endDate:{
    type: Date,
    required: true
   },
   dateBooked:{
    type: Date,
    required: true
   },
   isPaid:{
    type: Boolean,
    required: true,
    default: false
   },
   status:{
    type: String,
    required: true
   }
});

export default mongoose.model('Booking', bookingSchema);