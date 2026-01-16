import { getPool } from '../config/database.js';

export const getJobSuggestions = async (req, res) => {
  try {
    const pool = getPool();
    const userId = req.user.id;

    const [users] = await pool.query(
      `SELECT u.skills, u.experience, u.education, r.parsed_data
       FROM users u
       LEFT JOIN resumes r ON r.user_id = u.id AND r.is_active = TRUE
       WHERE u.id = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    let userSkills = [];

    if (user.skills) {
      userSkills = typeof user.skills === 'string' 
        ? user.skills.split(',').map(s => s.trim().toLowerCase())
        : [];
    }

    if (user.parsed_data) {
      try {
        const parsedData = typeof user.parsed_data === 'string' 
          ? JSON.parse(user.parsed_data)
          : user.parsed_data;
        
        if (parsedData.skills && Array.isArray(parsedData.skills)) {
          const parsedSkills = parsedData.skills.map(s => 
            typeof s === 'string' ? s.trim().toLowerCase() : String(s).toLowerCase()
          );
          userSkills = [...new Set([...userSkills, ...parsedSkills])];
        }
      } catch (e) {
        console.error('Error parsing resume data:', e);
      }
    }

    const [jobs] = await pool.query(
      `SELECT j.*, c.name as company_name, c.logo as company_logo
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       WHERE j.status = 'active'
       ORDER BY j.created_at DESC
       LIMIT 50`,
    );

    const jobsWithMatch = jobs.map(job => {
      let matchScore = 0;
      const reasons = [];

      if (job.skills_required) {
        const jobSkills = typeof job.skills_required === 'string'
          ? job.skills_required.split(',').map(s => s.trim().toLowerCase())
          : [];

        const matchingSkills = userSkills.filter(skill => 
          jobSkills.some(js => 
            js.includes(skill) || skill.includes(js) || 
            js.toLowerCase() === skill.toLowerCase()
          )
        );

        if (matchingSkills.length > 0) {
          matchScore += matchingSkills.length * 15;
          reasons.push(`Matches ${matchingSkills.length} skill${matchingSkills.length > 1 ? 's' : ''}: ${matchingSkills.slice(0, 3).join(', ')}`);
        }

        if (matchingSkills.length === jobSkills.length && jobSkills.length > 0) {
          matchScore += 20;
          reasons.push('Perfect skill match!');
        }
      }

      if (user.experience && job.experience_level) {
        const userExp = user.experience.toLowerCase();
        const jobExp = job.experience_level.toLowerCase();

        if (userExp.includes('senior') && (jobExp.includes('senior') || jobExp.includes('lead'))) {
          matchScore += 10;
          reasons.push('Experience level matches');
        } else if (userExp.includes('junior') && jobExp.includes('junior')) {
          matchScore += 10;
          reasons.push('Experience level matches');
        } else if (userExp.includes('mid') && jobExp.includes('mid')) {
          matchScore += 10;
          reasons.push('Experience level matches');
        }
      }

      if (user.education && job.description) {
        const education = user.education.toLowerCase();
        const description = job.description.toLowerCase();

        if (education.includes('computer science') && description.includes('cs')) {
          matchScore += 5;
        } else if (education.includes('engineering') && description.includes('engineer')) {
          matchScore += 5;
        }
      }

      if (matchScore === 0) {
        matchScore = Math.floor(Math.random() * 20) + 10;
        reasons.push('Recommended for you');
      }

      return {
        ...job,
        matchScore: Math.min(matchScore, 100),
        reasons: reasons.slice(0, 3),
      };
    });

    const sortedJobs = jobsWithMatch
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    res.json({ 
      jobs: sortedJobs,
      userSkills: userSkills.slice(0, 10),
    });
  } catch (error) {
    console.error('Get job suggestions error:', error);
    res.status(500).json({ error: 'Failed to get job suggestions', details: error.message });
  }
};
