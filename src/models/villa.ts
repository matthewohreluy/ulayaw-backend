import mongoose from "mongoose";

const Schema = mongoose.Schema;
const villaSchema = new Schema({
   name:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: false
   },
   price:{
    type: Number,
    required: true
   },
   minPerson:{
    type: Number,
    required: true
   },
   maxPerson:{
    type: Number,
    required: true,
   },
   checkInTime:{
    type: String,
    required: true,
   },
   checkOutTime:{
    type: String,
    required: true,
   },
   inclusions:{
    type: Array,
    default:[]
   },
   ammenities:{
    type: Array,
    default:[]
   },
   addOns:{
    type: Array,
    default:[]
   },
   imageURLs:{
    type: Array,
    default:[]
   },
   note:{
    type: String,
    required: false
   }
});

export default mongoose.model('Villa', villaSchema);