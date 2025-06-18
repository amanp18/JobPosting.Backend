import JobModel from "../model/JobModel.js";

export const createjob = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if ((!title, !description, !location)) {
      return res.status(400).send({
        success: false,
        message: "all fields are mandatory",
      });
    }
    const job = new JobModel({
      title,
      description,
      location,
      createdBy: req.user._id,
    })
    const kt= await job.save();
    res.status(201).send({
      success: true,
      message: "job created",
       kt,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error while creating job",
    });
  }
};
export const deletejob = async(req,res) => {
  try {
    const del = req.params.id
    const recruit = req.user._id
    // console.log(del)
    // console.log(recruit)
    const job = await JobModel.findOne({_id: del,createdBy: recruit})
// console.log(job)
// console.log(JobModel)
    if(!job) return res.status(404).send({success:false, message:'job not found or unauth'})
      
      await JobModel.findByIdAndDelete(del)

    return res.status(201).send({success:true,message:"job deleted"})
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error while deleting job",
      error
    });
  }

};
export const updatejob = async(req,res) => {
  try{
  const del = req.params.id
  const recruit = req.user._id
  const updatedJob = req.body

const job = await JobModel.findOne({_id: del,createdBy: recruit})
if(!job) return res.status(404).send({success:'false',message:'either job not exist or authorized user'})

  const result = await JobModel.findByIdAndUpdate(del,updatedJob,{
    new:true,
  })
  return  res.status(201).send({success:true,message:'job updated',result})
}
  catch(error)
{
res.status(500).send({
  success: false,
  message: "Server error while deleting job",
  error
})
}
  };
export const getRecruiterJobs = async(req,res) => {
  try{
    const recruit= req.user._id
    // console.log(recruit)
    
    const result = await JobModel.find({createdBy:recruit})
    // console.log(result)
    res.status(201).send({success:true,message:"only recruiter listed jobs are : ",result})
  }
  catch(err){
    res.status(500).send({
      success: false,
      message: "Server error while getting all job",
      err
    })
  }
};
export const getalljob = async(req,res) => {
  try{
  const result = await JobModel.find().populate('createdBy','name email').sort({ createdAt: -1 });
  res.status(201).send({success:true,message:"all job are here : ", result})}
  catch(err){
    res.status(500).send({success:false,message:'server problem', err})
  }
};
