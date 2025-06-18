import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

},{timestamps:true})

export default mongoose.model('Job',JobSchema)