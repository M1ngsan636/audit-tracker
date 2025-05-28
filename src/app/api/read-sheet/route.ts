// app/api/read-sheet/route.ts
import { NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps';

export async function GET() {
  try {
    const sheets = await getSheetClient();
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2:E', // adjust range as needed
    });

    const rows = res.data.values || [];

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error('Error reading sheet:', error);
    return NextResponse.json({ error: 'Failed to read Google Sheet' }, { status: 500 });
  }
}
