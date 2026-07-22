import type { VercelRequest, VercelResponse } from '@vercel/node';
import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

// Load Google Service Account credentials
let credentials: any = null;
const credPath = path.join(process.cwd(), 'credentials.json');

if (fs.existsSync(credPath)) {
  try {
    credentials = JSON.parse(fs.readFileSync(credPath, 'utf8'));
  } catch (err) {
    console.error('Failed to parse credentials.json:', err);
  }
} else if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  credentials = {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };
}

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || process.env.VITE_GOOGLE_SPREADSHEET_ID;

// Initialize JWT Client for Google Sheets API v4
let jwtClient: JWT | null = null;
if (credentials && credentials.client_email && credentials.private_key) {
  jwtClient = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// Cache sheet title to prevent redundant API queries
let cachedSheetTitle = "";

async function getSheetTitle(): Promise<string> {
  if (cachedSheetTitle) return cachedSheetTitle;

  if (!jwtClient || !SPREADSHEET_ID) {
    throw new Error('Google Sheets Service Account credentials or Spreadsheet ID not configured.');
  }

  const tokenResponse = await jwtClient.getAccessToken();
  const token = tokenResponse.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`;

  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to fetch spreadsheet structure: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const sheets = data.sheets || [];
  
  // Look for a tab named "Students" first
  const studentsTab = sheets.find((s: any) => s.properties?.title === "Students");
  if (studentsTab) {
    cachedSheetTitle = "Students";
  } else if (sheets.length > 0) {
    // Fallback to the very first tab in the spreadsheet (whatever it is named)
    cachedSheetTitle = sheets[0].properties?.title || "Sheet1";
  } else {
    cachedSheetTitle = "Sheet1";
  }

  return cachedSheetTitle;
}

// Google Sheets API V4 Helper (Appends Sheet Title automatically)
async function sheetsApiRequest(method: string, rangeWithoutSheet: string, body?: any) {
  if (!jwtClient || !SPREADSHEET_ID) {
    throw new Error('Google Sheets Service Account Credentials or Spreadsheet ID (GOOGLE_SPREADSHEET_ID) not configured.');
  }

  const sheetTitle = await getSheetTitle();
  const range = `${sheetTitle}!${rangeWithoutSheet}`;

  const tokenResponse = await jwtClient.getAccessToken();
  const token = tokenResponse.token;
  const headers = {
    Authorization: `Bearer ${token}`
  };
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}`;
  
  if (method === 'POST') {
    url += ':append?valueInputOption=USER_ENTERED';
  } else if (method === 'PUT') {
    url += '?valueInputOption=USER_ENTERED';
  }

  const response = await fetch(url, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Local mock database in case credentials/sheets are not configured yet
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
  // CORS Headers
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

  const hasSheets = jwtClient && SPREADSHEET_ID;

  if (hasSheets) {
    try {
      // 1. REGISTER
      if (action === 'register') {
        const data = await sheetsApiRequest('GET', 'A:J');
        const rows = data.values || [];

        for (let i = 1; i < rows.length; i++) {
          const cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
          const cellEmail = rows[i][2] ? rows[i][2].toString().trim().toLowerCase() : "";
          
          if ((cellId && cellId === studentId.trim().toLowerCase()) || 
              (cellEmail && cellEmail === email.trim().toLowerCase())) {
            return res.status(400).json({ success: false, message: 'Student ID or Email already exists in Google Sheet.' });
          }
        }

        await sheetsApiRequest('POST', 'A:J', {
          values: [[
            studentId.trim(),
            name.trim(),
            email.trim(),
            phone.trim(),
            password.trim(),
            'FALSE',
            'FALSE',
            'FALSE',
            new Date().toISOString(),
            ''
          ]]
        });

        return res.status(200).json({
          success: true,
          message: 'Student registered successfully in Google Sheet.',
          isLiveSheet: true
        });
      }

      // 2. LOGIN
      if (action === 'login') {
        const data = await sheetsApiRequest('GET', 'A:J');
        const rows = data.values || [];
        const targetId = studentId.trim().toLowerCase();

        let studentRowIndex = -1;
        let studentData: any = null;

        for (let i = 1; i < rows.length; i++) {
          const cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
          const cellEmail = rows[i][2] ? rows[i][2].toString().trim().toLowerCase() : "";

          if ((cellId && cellId === targetId) || (cellEmail && cellEmail === targetId)) {
            if (rows[i][4] && rows[i][4].toString() === password.toString()) {
              studentRowIndex = i + 1;
              studentData = rows[i];
              break;
            } else {
              return res.status(401).json({ success: false, message: 'Incorrect password.' });
            }
          }
        }

        if (studentRowIndex === -1) {
          return res.status(404).json({ success: false, message: 'Student not found in Google Sheet.' });
        }

        // Update Last Active date
        await sheetsApiRequest('PUT', `I${studentRowIndex}`, {
          values: [[new Date().toISOString()]]
        });

        return res.status(200).json({
          success: true,
          student: {
            studentId: studentData[0],
            name: studentData[1],
            email: studentData[2],
            phone: studentData[3],
            modules: [
              studentData[5]?.toString().toUpperCase() === 'TRUE',
              studentData[6]?.toString().toUpperCase() === 'TRUE',
              studentData[7]?.toString().toUpperCase() === 'TRUE'
            ],
            resumeLink: studentData[9] || ''
          },
          isLiveSheet: true
        });
      }

      // 3. SYNC MODULES
      if (action === 'sync') {
        const data = await sheetsApiRequest('GET', 'A:A');
        const rows = data.values || [];
        const targetId = studentId.trim().toLowerCase();
        let studentRowIndex = -1;

        for (let i = 1; i < rows.length; i++) {
          const cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
          if (cellId && cellId === targetId) {
            studentRowIndex = i + 1;
            break;
          }
        }

        if (studentRowIndex === -1) {
          return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        await sheetsApiRequest('PUT', `F${studentRowIndex}:I${studentRowIndex}`, {
          values: [[
            modules[0] ? 'TRUE' : 'FALSE',
            modules[1] ? 'TRUE' : 'FALSE',
            modules[2] ? 'TRUE' : 'FALSE',
            new Date().toISOString()
          ]]
        });

        return res.status(200).json({ success: true, message: 'Progress saved successfully.' });
      }

      // 4. UPDATE RESUME URL
      if (action === 'update_resume') {
        const data = await sheetsApiRequest('GET', 'A:A');
        const rows = data.values || [];
        const targetId = studentId.trim().toLowerCase();
        let studentRowIndex = -1;

        for (let i = 1; i < rows.length; i++) {
          const cellId = rows[i][0] ? rows[i][0].toString().trim().toLowerCase() : "";
          if (cellId && cellId === targetId) {
            studentRowIndex = i + 1;
            break;
          }
        }

        if (studentRowIndex === -1) {
          return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        await sheetsApiRequest('PUT', `I${studentRowIndex}:J${studentRowIndex}`, {
          values: [[
            new Date().toISOString(),
            resumeLink
          ]]
        });

        return res.status(200).json({ success: true, message: 'Resume link updated successfully.' });
      }

      return res.status(400).json({ success: false, message: 'Invalid action parameter.' });

    } catch (error: any) {
      console.error('Google Sheets API operations failed:', error);
      return res.status(500).json({
        success: false,
        message: 'Google Sheets direct API error occurred.',
        error: error.message
      });
    }
  }

  // FALLBACK (Mock mode logic)
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
