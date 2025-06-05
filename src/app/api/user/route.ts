// src/app/api/user/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'User not logged in' }, { status: 401 });
    }

    const sessionData = JSON.parse(sessionCookie.value);
    const { id, username, role } = sessionData;

    const sheets = await getSheetClient();

    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A2:L',
    });

    const users = usersRes.data.values || [];

    const userRow = users.find((row) => row[0] === id);

    if (!userRow) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const [user_id, , name, email, , , , department, joinDate, avatar, bio, skills] = userRow;

    // Handle undefined or empty skills
    const skillsArray = skills ? skills.split(',').map((skill) => skill.trim()) : [];

    const userData = {
      id: user_id,
      username,
      name,
      email,
      role,
      department,
      joinDate,
      avatar,
      bio,
      skills: skillsArray,
    };

    return NextResponse.json({ success: true, user: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}