import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export class ResumeParserService {
  static async extractText(filePath, fileType) {
    try {
      const buffer = await fs.readFile(filePath);

      if (fileType === 'application/pdf') {
        const data = await pdfParse(buffer);
        return data.text;
      } else if (fileType.includes('word') || fileType.includes('document')) {
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
      } else if (fileType.includes('text')) {
        return buffer.toString('utf-8');
      }

      throw new Error('Unsupported file type');
    } catch (error) {
      console.error('Error extracting text:', error);
      throw new Error(`Failed to extract text: ${error.message}`);
    }
  }

  static async parseWithAI(text) {
    try {
      if (!genAI || !process.env.GEMINI_API_KEY) {
        return this.parseWithRegex(text);
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Extract the following information from this resume text and return it as a JSON object with the exact keys shown:

{
  "name": "Full name",
  "email": "Email address",
  "phone": "Phone number",
  "skills": ["skill1", "skill2", ...],
  "experience": "Summary of work experience",
  "education": "Educational background",
  "summary": "Professional summary or objective"
}

Resume text:
${text.substring(0, 30000)}

Return only the JSON object, no other text. Make sure the JSON is valid and properly formatted.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text().trim();

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          return this.parseWithRegex(text);
        }
      }

      return this.parseWithRegex(text);
    } catch (error) {
      console.error('Gemini API parsing error, falling back to regex:', error);
      return this.parseWithRegex(text);
    }
  }

  static parseWithRegex(text) {
    const result = {
      name: null,
      email: null,
      phone: null,
      skills: [],
      experience: null,
      education: null,
      summary: null,
    };

    const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/gi;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
    
    const emails = text.match(emailRegex);
    if (emails && emails.length > 0) {
      result.email = emails[0];
    }

    const phones = text.match(phoneRegex);
    if (phones && phones.length > 0) {
      result.phone = phones[0].trim();
    }

    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
      result.name = lines[0].trim();
    }

    const skillKeywords = [
      'javascript', 'python', 'java', 'react', 'node', 'express', 'sql', 'mongodb',
      'html', 'css', 'typescript', 'vue', 'angular', 'docker', 'kubernetes', 'aws',
      'azure', 'gcp', 'git', 'linux', 'agile', 'scrum', 'machine learning', 'ai',
      'data science', 'ui/ux', 'figma', 'adobe', 'photoshop', 'illustrator'
    ];

    const lowerText = text.toLowerCase();
    skillKeywords.forEach(skill => {
      if (lowerText.includes(skill.toLowerCase())) {
        result.skills.push(skill);
      }
    });

    const experienceMatch = text.match(/(?:experience|work|employment|professional\s+experience)[\s\S]{1,500}/i);
    if (experienceMatch) {
      result.experience = experienceMatch[0].substring(0, 500);
    }

    const educationMatch = text.match(/(?:education|qualification|degree)[\s\S]{1,300}/i);
    if (educationMatch) {
      result.education = educationMatch[0].substring(0, 300);
    }

    const summaryMatch = text.match(/(?:summary|objective|profile|about)[\s\S]{1,300}/i);
    if (summaryMatch) {
      result.summary = summaryMatch[0].substring(0, 300);
    }

    return result;
  }

  static async parseResume(filePath, fileType) {
    try {
      const text = await this.extractText(filePath, fileType);
      const parsedData = await this.parseWithAI(text);

      return {
        rawText: text.substring(0, 10000),
        parsedData,
      };
    } catch (error) {
      console.error('Error parsing resume:', error);
      throw error;
    }
  }
}
