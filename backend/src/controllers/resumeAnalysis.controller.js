import { ResumeAnalysisService } from '../services/resumeAnalysis.service.js';
import fs from 'fs/promises';
import path from 'path';

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const filePath = file.path;

    try {
      const analysis = await ResumeAnalysisService.analyzeResume(filePath, file.mimetype);

      res.json({
        analysis,
        message: 'Resume analyzed successfully',
      });
    } catch (analysisError) {
      console.error('Analysis error:', analysisError);
      res.status(500).json({ error: 'Failed to analyze resume', details: analysisError.message });
    } finally {
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
  } catch (error) {
    console.error('Analyze resume error:', error);
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    res.status(500).json({ error: 'Failed to analyze resume', details: error.message });
  }
};
