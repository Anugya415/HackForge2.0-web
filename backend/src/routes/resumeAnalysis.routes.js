import express from 'express';
import { analyzeResume } from '../controllers/resumeAnalysis.controller.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.post('/analyze', upload.single('resume'), analyzeResume);

export default router;
