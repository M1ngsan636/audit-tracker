// lib/googleSheets.ts

import { google } from 'googleapis';
import { readFileSync } from 'fs';
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
