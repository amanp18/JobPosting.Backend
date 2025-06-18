import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
  password:{
    type:String,
    required:true,
  },
  role: {
    type: String,
    enum: ['recruiter', 'employee'],
    required: true,
    default: 'employee', // Default role if not specified
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export default mongoose.model('User', UserSchema)