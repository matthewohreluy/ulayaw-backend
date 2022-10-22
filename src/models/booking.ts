import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
   villaId:{
    type: Schema.Types.ObjectId,
    ref: 'Villa',
    required: true
   },
   userId:{
    type: Schema.Types.ObjectId,
    ref: 'User',
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
   },
   bookingType:{
      type: String,
      required: true
   },
   addOns:[
      {
         type: Object,
         required: false
      }
   ],
   totalAmount:{
      type: Number
   }
});

export default mongoose.model('Booking', bookingSchema);