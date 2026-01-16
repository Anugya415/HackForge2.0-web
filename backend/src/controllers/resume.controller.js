import { getPool } from '../config/database.js';
import { ResumeParserService } from '../services/resumeParser.service.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.user.id;
    const file = req.file;
    const filePath = file.path;
    const fileUrl = `/uploads/resumes/${path.basename(filePath)}`;

    let parsedData = null;
    let extractedData = {};

    try {
      const parseResult = await ResumeParserService.parseResume(filePath, file.mimetype);
      parsedData = parseResult.parsedData;
      extractedData = {
        name: parsedData.name,
        email: parsedData.email,
        phone: parsedData.phone,
        skills: parsedData.skills ? (Array.isArray(parsedData.skills) ? parsedData.skills.join(',') : parsedData.skills) : null,
        experience: parsedData.experience,
        education: parsedData.education,
      };
    } catch (parseError) {
      console.error('Resume parsing error:', parseError);
    }

    const pool = getPool();

    await pool.query(
      'UPDATE resumes SET is_active = FALSE WHERE user_id = ?',
      [userId]
    );

    const [result] = await pool.query(
      `INSERT INTO resumes (user_id, file_name, file_url, file_size, parsed_data, name, email, phone, skills, experience, education)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        file.originalname,
        fileUrl,
        file.size,
        parsedData ? JSON.stringify(parsedData) : null,
        extractedData.name,
        extractedData.email,
        extractedData.phone,
        extractedData.skills,
        extractedData.experience,
        extractedData.education,
      ]
    );

    if (extractedData.email || extractedData.name || extractedData.phone || extractedData.skills) {
      const updateFields = [];
      const updateValues = [];

      if (extractedData.name) {
        updateFields.push('name = ?');
        updateValues.push(extractedData.name);
      }
      if (extractedData.email) {
        updateFields.push('email = ?');
        updateValues.push(extractedData.email);
      }
      if (extractedData.phone) {
        updateFields.push('phone = ?');
        updateValues.push(extractedData.phone);
      }
      if (extractedData.skills) {
        updateFields.push('skills = ?');
        updateValues.push(extractedData.skills);
      }
      if (extractedData.experience) {
        updateFields.push('experience = ?');
        updateValues.push(extractedData.experience);
      }
      if (extractedData.education) {
        updateFields.push('education = ?');
        updateValues.push(extractedData.education);
      }

      if (updateFields.length > 0) {
        updateValues.push(userId);
        await pool.query(
          `UPDATE users SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
          updateValues
        );
      }
    }

    const [resumes] = await pool.query(
      'SELECT * FROM resumes WHERE id = ?',
      [result.insertId]
    );

    let suggestedJobs = [];
    try {
      if (parsedData && (parsedData.skills || extractedData.skills)) {
        const userSkills = parsedData.skills 
          ? (Array.isArray(parsedData.skills) ? parsedData.skills.map(s => String(s).trim()) : [String(parsedData.skills).trim()])
          : (extractedData.skills ? extractedData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0) : []);

        if (userSkills.length > 0) {
          const skillsQuery = userSkills
            .slice(0, 5)
            .map(() => `j.skills_required LIKE ?`)
            .join(' OR ');

          if (skillsQuery) {
            const skillParams = userSkills.slice(0, 5).map(skill => `%${skill}%`);
            const [jobs] = await pool.query(
              `SELECT j.*, c.name as company_name, c.logo as company_logo
               FROM jobs j
               JOIN companies c ON j.company_id = c.id
               WHERE j.status = 'active' AND (${skillsQuery})
               ORDER BY j.created_at DESC
               LIMIT 5`,
              skillParams
            );
            suggestedJobs = jobs || [];
          }
        }
      }
    } catch (suggestionError) {
      console.error('Error getting job suggestions:', suggestionError);
    }

    res.status(201).json({
      resume: resumes[0],
      parsedData: parsedData,
      suggestedJobs: suggestedJobs,
      message: 'Resume uploaded and parsed successfully',
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    res.status(500).json({ error: 'Failed to upload resume', details: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;

    const [resumes] = await pool.query(
      'SELECT * FROM resumes WHERE user_id = ? ORDER BY uploaded_at DESC',
      [userId]
    );

    const resumesWithParsedData = resumes.map(resume => ({
      ...resume,
      parsed_data: resume.parsed_data ? JSON.parse(resume.parsed_data) : null,
    }));

    res.json({ resumes: resumesWithParsedData });
  } catch (error) {
    console.error('Get user resumes error:', error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;
    const resumeId = req.params.id;

    const [resumes] = await pool.query(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [resumeId, userId]
    );

    if (resumes.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const resume = resumes[0];
    const filePath = path.join(process.cwd(), resume.file_url);

    try {
      await fs.unlink(filePath);
    } catch (unlinkError) {
      console.error('Error deleting file:', unlinkError);
    }

    await pool.query('DELETE FROM resumes WHERE id = ?', [resumeId]);

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};
