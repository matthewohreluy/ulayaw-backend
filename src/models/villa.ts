import mongoose from "mongoose";

const Schema = mongoose.Schema;

const villaDefinitionSchema = new Schema({
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

const villaSchema = new Schema({
   name:{
    type: String,
    required: true
   },
   overnight:{
      type: villaDefinitionSchema,
      required: true
   },
   dayTour:{
      type: villaDefinitionSchema,
      required: true
   }
});

export default mongoose.model('Villa', villaSchema);