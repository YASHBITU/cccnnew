import type { VercelRequest, VercelResponse } from '@vercel/node';
import { JWT } from 'google-auth-library';

// Hardcoded Google Service Account credentials & Spreadsheet ID as requested to skip Vercel dashboard environment variables setup
const SPREADSHEET_ID = "1ib-kb2u4AkQGg43HWcAd9BCEHsgBwv-fKqCeB4smSSQ";

const credentials = {
  client_email: "sheets-tracker-bot@cccc-503212.iam.gserviceaccount.com",
  // Injecting private key directly to avoid formatting parsing errors on Vercel
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJTjdcqPEUIoA2\nc/et0GWT/g83ShebjKsUvKXUzWvanHXQ/MFxTYi8dxo8Kj7cIIjfak7PyJ83Nqs5\n/4CaPibVJ93NhYq3798PVRHJ7PRBWX4UdUufBxO3Cp73VZnXiBumA25Ce2noLBcS\nPb7YaECQdmnjd8Ch9I4uJrutzInsRrLQThe4YS0kH9wXVSpCfQlVpnWelvVrXK6D\n6ve91vPCewDQtJXBswEUhGlRCWbcM4aZ7kuvcXOvF1y4bbaDLzeHV2YzqZb3MsGj\nWUB4UUaR1FY2KYrfN7nqG0G49FblRMLm8OdAJwfDTBTXISdckmhUNF++3m9ARg+S\nFCIX4TvzAgMBAAECggEAHwT2cvN1cpd+ZOWpx2woEDiYj6R9zseg9SkR70tYJe+b\nbVYFWOLhrGjjRLIdzZMV2Zdqst9ElCAlx7d0pvqSG/ZwrzgMusXeUWEtGeMcIEBy\nCnpTP3C6ZlI0p1gsGeeB8IBG1T0Ugg+JM+kKfL5Tye71PMqPMbrwIxxvfxsthZgk\nAypc6BJ6jhcOl2tIAMhZOo1ZGKctb/ATilO4BdqS/07XLkGle+RjBtr7T+JZXXyJ\ncQYV/8z7prPWWH6ydB6NekvyQwd30yuNr71D81OrO+vm9kvH2UUuMJMycgTqREU1\nzd/C/XMBXg9NoXlzyQrmMoVEJp9BBdlk6KemCkpEAQKBgQDmD4SK+UMup1SgB11A\nTsYm54RNgWfecIcs/SpmqUnnVus+xzfUPPUYFxdh3teAxLf6M4Fttg2cxPAn/Wjw\nhcH811YMy7Ee1GK/TxKpC/wTP8L5ojaTbOB63yuldtUuwVE1IJIz42agzEjZVp1R\nuDPgXjHgLTxrLJIA+r+Sw95nMwKBgQDgALXPEVV+kw+YK/mNCN066Yn3BQs+JHiJ\nK/wP/hwRX/SWX6fsxvEtlsrevvrXSqQiqx5XTTSikRHaCYJd0KZyGQTiUkt6GNt6\ntVd3KcG8BHw7MhAU3BMNR1W+mhXJeIgnJeHjxEwpJtsv/YewiMEcVxANS2DKjjNG\n/CQfvVLYQQKBgAi0rZ9Ur2Ykjt8/aBf24yi1uhv0uamBOJxLOD+KSHGoqF5Hy6UM\naXnv5cKeXClTSGL/b/Zm3T0BdtUMkdwIM78NpwP08U7pWpNCusIK4g8Yaphnuwj5\nJcWAjHZGeOq8BgaspNuxz0Bmeps+29Ur00q6Rcjl7VNg7GV9F6LGJrRhAoGBANtp\nlqxnLDk5T3Mcz+oHnruP+iXN+P87th2WyeXYYCHcvbV1qQTSsXaYV8rrgsTTRgb3\nWlblNwNt2fCak+nU8NSeERymw2urYYDGlBATBMNoGU/ab8oe70J4d1Kll2Wq/KJs\BuGVa4x7lQNi8UBIE+/wj7aV+Q8vTqbfX3r/dWCBAoGBAOMBmewwRPs1jRRj0Oxz
  3tNagDzhz3YIOzjlunxag2HB4sTJV+W1GIw/qy6uD3JYJXNrgASmD9TYzqy76Zqt
  36xwZ/ZY52ARghKjB28xEFvDfVUX9Xh4wn60+jATdZMkl5leeJXfNonzVUdNxhHY
  Ax9lRH0e9He2QtAskjh0jSmE\n-----END PRIVATE KEY-----\n
  ```
};

// Initialize JWT Client for Google Sheets API v4
const jwtClient = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Cache sheet title to prevent redundant API queries
let cachedSheetTitle = "";

async function getSheetTitle(): Promise<string> {
  if (cachedSheetTitle) return cachedSheetTitle;

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
    // Fallback to the very first tab in the spreadsheet
    cachedSheetTitle = sheets[0].properties?.title || "Sheet1";
  } else {
    cachedSheetTitle = "Sheet1";
  }

  return cachedSheetTitle;
}

// Google Sheets API V4 Helper (Appends Sheet Title automatically)
async function sheetsApiRequest(method: string, rangeWithoutSheet: string, body?: any) {
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
          '' // Resume / Canva Link (Column J)
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
