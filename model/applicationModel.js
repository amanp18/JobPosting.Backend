import mongoose from 'mongoose'

const ApplicantionSchema = new mongoose.Schema({
    jobId: {type: mongoose.Schema.Types.ObjectId, ref:"Job", required:true},
    applicantId : {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    resume:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    gmail:{
        type:String,
        required:true
    },
    appliedAt:{
        type:Date,
        default:Date.now
    },
})

export default mongoose.model('Application',ApplicantionSchema)