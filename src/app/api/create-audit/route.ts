// src/app/api/create-audit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps'; // Replace with your actual ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auditId, date, place, department, auditee } = body;

    const sheets = await getSheetClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[auditId, date, place, department, auditee]],
      },
    });

    return NextResponse.json({ message: 'Audit added successfully' });
  } catch (error) {
    console.error('Error writing to sheet:', error);
    return NextResponse.json({ error: 'Failed to write to Google Sheet' }, { status: 500 });
  }
}
