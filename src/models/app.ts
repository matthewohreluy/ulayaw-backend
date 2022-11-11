import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
   contact:{
      type: String,
      required: false
     },
   location:{
   type: String,
   required: false
   },
   email:{
   type: String,
   required: false
   },
   fbLink:{
   type: String,
   required: false
   },
   instaLink:{
   type: String,
   required: false
   },
   businessLogo:{
   type: String,
   required: false
   },
});



export default mongoose.model('Application', applicationSchema);