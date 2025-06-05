// src/app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('Login request received:', { email, password });

    const sheets = await getSheetClient();

    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A2:L',
    });

    const users = usersRes.data.values || [];

    console.log('Users data from Google Sheets:', users);

    const userRow = users.find(
      (row: string[]) =>
        row[3].toLowerCase() === email.toLowerCase() && row[4] === password && row[5]?.toLowerCase() === 'active'
    );

    if (!userRow) {
      console.log('No matching user found');
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const [user_id, username, , , , role] = userRow;

    console.log('User found:', { user_id, username, email, role });

    // Set cookie
    const res = NextResponse.json({
      success: true,
      user: { id: user_id, username, email, role },
    });

    res.cookies.set('session', JSON.stringify({ id: user_id, username, role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}