import express from 'express'
import { isEmployee, isRecruiter, requiredsignin } from '../middleware/authmiddleware';
import { applyJob, getAppliedJobs } from '../controller/appliController';

const router= express.Router()

router.post('/apply/:id', requiredsignin, isEmployee, applyJob);
router.get('/applicants/:id',requiredsignin,isRecruiter,applicants)
router.get('/applied-jobs', requiredsignin, isEmployee, getAppliedJobs)
export default router