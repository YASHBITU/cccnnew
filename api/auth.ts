import type { VercelRequest, VercelResponse } from '@vercel/node';

// We fetch the Google Apps Script Web App URL from environment variables
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL;

// Simple in-memory mock database fallback for local testing when GOOGLE_SCRIPT_URL is not set
interface MockStudent {
  studentId: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  modules: boolean[];
  resumeLink: string;
}

const mockDb: MockStudent[] = [
  {
    studentId: "student@ccc.com",
    name: "Demo Student",
    email: "student@ccc.com",
    phone: "+61 412 345 678",
    password: "CCC2026",
    modules: [true, false, false],
    resumeLink: "https://docs.google.com/document/d/1t-8Z-w9jI03o3UeK8k7c7N-N1vX_0l0u/copy"
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { action, studentId, name, email, phone, password, modules, resumeLink } = req.body;

  // If Google Sheet Apps Script URL is configured, proxy the request to it
  if (GOOGLE_SCRIPT_URL) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        throw new Error(`Google Script returned status: ${response.status}`);
      }

      const result = await response.json();
      return res.status(200).json({ ...result, isLiveSheet: true });
    } catch (error: any) {
      console.error('Proxy to Google Sheets failed:', error);
      return res.status(502).json({
        success: false,
        message: 'Google Sheets sync failed. Falling back to local mock state.',
        error: error.message
      });
    }
  }

  // Fallback / Mock Database Logic (Runs when Google Sheet URL is not configured yet)
  try {
    if (action === 'register') {
      const exists = mockDb.some(
        s => s.studentId.toLowerCase() === studentId.toLowerCase() || s.email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        return res.status(400).json({ success: false, message: 'Student ID or Email already exists in local system.' });
      }

      const newStudent: MockStudent = {
        studentId,
        name,
        email,
        phone,
        password,
        modules: [false, false, false],
        resumeLink: ''
      };
      
      mockDb.push(newStudent);

      return res.status(200).json({
        success: true,
        message: 'Student registered successfully (Mock Mode)',
        isLiveSheet: false
      });
    }

    if (action === 'login') {
      const student = mockDb.find(
        s => s.studentId.toLowerCase() === studentId.toLowerCase() || s.email.toLowerCase() === studentId.toLowerCase()
      );

      if (!student) {
        return res.status(404).json({ success: false, message: 'Student ID not found in local system.' });
      }

      if (student.password !== password) {
        return res.status(401).json({ success: false, message: 'Incorrect password.' });
      }

      return res.status(200).json({
        success: true,
        student: {
          studentId: student.studentId,
          name: student.name,
          email: student.email,
          phone: student.phone,
          modules: student.modules,
          resumeLink: student.resumeLink || ''
        },
        isLiveSheet: false
      });
    }

    if (action === 'sync') {
      const student = mockDb.find(s => s.studentId.toLowerCase() === studentId.toLowerCase());
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student ID not found.' });
      }

      student.modules = modules;
      return res.status(200).json({
        success: true,
        message: 'Progress saved successfully (Mock Mode)',
        isLiveSheet: false
      });
    }

    if (action === 'update_resume') {
      const student = mockDb.find(s => s.studentId.toLowerCase() === studentId.toLowerCase());
      if (!student) {
        return res.status(404).json({ success: false, message: 'Student ID not found.' });
      }

      student.resumeLink = resumeLink;
      return res.status(200).json({
        success: true,
        message: 'Resume link updated successfully (Mock Mode)',
        isLiveSheet: false
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid action parameter.' });

  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
