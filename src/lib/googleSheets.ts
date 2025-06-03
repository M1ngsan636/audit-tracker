// src/lib/googleSheets.ts

import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'service-account-key.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export async function getSheetClient() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });
  return sheets;
}

export async function appendRow(spreadsheetId: string, range: string, values: any[]) {
  const sheets = await getSheetClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range, // e.g. "Sheet1!A1"
    valueInputOption: 'RAW',
    requestBody: {
      values: [values], // Must be a 2D array
    },
  });
}

export async function readSheet(spreadsheetId: string, range: string) {
  const sheets = await getSheetClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return res.data.values || [];
}
