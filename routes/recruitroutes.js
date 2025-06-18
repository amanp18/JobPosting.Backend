import express from 'express'
import { isRecruiter, requiredsignin } from '../middleware/authmiddleware.js'
import { createjob, deletejob, getalljob, getRecruiterJobs, updatejob } from '../controller/RecruiterController.js'

const router = express.Router()

router.post('/create',requiredsignin,isRecruiter,createjob)
router.patch('/update/:id',requiredsignin,isRecruiter,updatejob)
router.delete('/delete/:id',requiredsignin,isRecruiter,deletejob)
router.get('/recruiter-jobs', requiredsignin, isRecruiter, getRecruiterJobs);

/* 📝 Application
POST /api/jobs/:jobId/apply – employee applies

GET /api/jobs/:id/applicants – recruiter sees applicants

GET /api/applications/me – employee sees own applications */

//for both employee and recruiter
router.get('/all-Jobs',requiredsignin,getalljob)

export default router