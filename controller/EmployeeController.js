import JobModel from "../model/JobModel.js"

export const JobDetail = async(req,res)=>{
    try {
        const job = await JobModel.findById(req.params.id).populate('createdBy','name email')
        if(!job) return res.status(404).json({error:'job not found'})
            res.status(200).json(job)
    } catch (error) {
        res.status(500).json({error:'Failed to fetch job detail'})
    }
}