import userModel from "../model/userModel"

export const myprofile =async(req,res)=>{
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error:'failed to fetch user profile'})
    }
}

export const recruitprofile = async(req,res)=>{
    try {
        const recruiter=  await userModel.findById(req.params.id).select('-password')
        if(!recruiter|| recruiter.role !== 'recruiter') return res.status(404).json({error:'Recruiter not found'})
            res.status(200).json(recruiter)
    } catch (error) {
        res.status(500).json({error:'failed to fetch recruiter profile'})
    }
}