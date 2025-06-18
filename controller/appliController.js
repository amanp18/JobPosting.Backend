import JobModel from "../model/JobModel";
import applicationModel from "../model/applicationModel";

export const applyJob = async (req, res) => {
  try {
    const { resume, name, experience, skills, gmail } = req.body;
    const jobId = req.params.id;
    const applicantId = req.user._id;

    const job = await JobModel.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const alreadyapplied = await applicationModel.findOne({
      jobId,
      applicantId,
    });
    if (alreadyapplied)
      return res.status(400).json({ error: "already applied" });

    const isvalidURL = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };
    if (!isvalidURL(resume)) {
      return res.status(400).json({ error: "Invalid resume URL" });
    }
    const newApp = new applicationModel({
      jobId,
      applicantId,
      resume,
      name,
      experience,
      skills,
      gmail,
    });
    await newApp.save();
    res.status(201).json({ message: "application submitted" });
  } catch (error) {
    res.status(500).json({ error: "failed to submit" });
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const appli = applicationModel
      .findById({ applicantId: req.user._id })
      .populate({
        path: "jobId",
        select: "title description location company",
        populate: { path: "createdBy", select: "name email" },
      });
    res.status(200).json(appli);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch applications" });
  }
};

export const applicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = JobModel.findById(jobId);
    if (!job)
      return res.status(404).json({ success: false, message: "job not found" });
    if (job.createdBy.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ success: false, message: "not your job posting " });
    const applicants = await applicationModel
      .find(jobId)
      .populate("applicantId", "-password")
      .select("-jobId");
    res
      .status(200)
      .json({ success: true, total: applicants.length, applicants });
  } catch (error) {
    console.log("error gettinng applicants");
    res.status(500), json({ success: false, message: "server error", error });
  }
};
