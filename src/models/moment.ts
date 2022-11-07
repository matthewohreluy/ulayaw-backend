import mongoose from "mongoose";

const Schema = mongoose.Schema;
const momentSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status:{
      type: String,
      default: 'New',
      required: true
    },
    remarks:{
      type: String,
      default: '',
      required: false
    },
    imageUrl: {
        type: String,
        required: false,
       },
       description:{
        type: String,
        required: false
       },
     dateUpdated:{
        type: Date,
        required: false
     }
});

export default mongoose.model('Moment', momentSchema);
