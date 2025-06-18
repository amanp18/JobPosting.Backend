import express from 'express'
import { requiredsignin } from '../middleware/authmiddleware'

const router = express.Router()

router.post('/message/send',requiredsignin,sendmessage)
router.get('/message/:withUserId',requiredsignin,getconversation)