import express from 'express'
import { isEmployee, requiredsignin } from '../middleware/authmiddleware'
import { myprofile,recruitprofile } from '../controller/User'
const router = express.Router()

router.get('/user/me',requiredsignin,myprofile)
//view recruiter profile for emplloyee
router.get('/user/:id',requiredsignin,isEmployee,recruitprofile)