import express from 'express';
import { sendSummary } from '../controllers/emailController.js';

const router = express.Router();
router.post('/', sendSummary);
export default router;
