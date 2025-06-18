import JWT from 'jsonwebtoken'
import userModel from '../model/userModel.js';

export const requiredsignin = async(req,res,next)=>{
try {
    const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
    console.log(decode)
    req.user = await userModel.findById(decode._id)
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
    next();
    
} catch (error) {
    res.status(401).send({success:false,message:'unauthorized',error})
}
}
export  const isRecruiter = async(req,res,next)=>{
    if(req.user.role !== 'recruiter'){
        return res.status(403).send({ success: false, message: 'Access denied: Recruiters only' });
    }
    next();
}
export const isEmployee = async (req,res,next)=>{
    if (req.user.role !== 'employee')
    {
        return res.status(403).send({success: false, message:'Access denied: Employee only'})
    }
    next();
}