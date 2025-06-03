import { cookies } from 'next/headers'; // NEW
import { NextRequest, NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = 'your-spreadsheet-id';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const sheets = await getSheetClient();

    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A2:F',
    });

    const users = usersRes.data.values || [];

    const userRow = users.find(
      (row) =>
        row[2] === email && row[3] === password && row[4]?.toLowerCase() === 'active'
    );

    if (!userRow) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const [user_id, username, , , , role] = userRow;

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
    });

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
