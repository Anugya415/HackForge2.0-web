import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { uploadResume, getUserResumes, deleteResume } from '../controllers/resume.controller.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.use(authenticate);

router.post('/upload', upload.single('resume'), uploadResume);

router.get('/my', getUserResumes);

router.delete('/:id', deleteResume);

export default router;
