import express from 'express'
import { isEmployee, requiredsignin } from '../middleware/authmiddleware'
import { JobDetail } from '../controller/EmployeeController';
import { getalljob } from '../controller/RecruiterController';

const router = express.Router()


router.get('/jobdetail/:id', requiredsignin, isEmployee , JobDetail)
router.get('/all-Jobs',requiredsignin,getalljob)
export default router