// src/app/api/user/update/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getSheetClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = '1isROfTyz7iWSHwIEr33R2z9xH9fwzRXwUcU3yg-Gaps';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'User not logged in' }, { status: 401 });
    }

    const sessionData = JSON.parse(sessionCookie.value);
    const { id } = sessionData;

    const body = await req.json();
    const { name, email, role, department, bio, skills } = body;

    const sheets = await getSheetClient();

    // Fetch existing user data to get the correct row index and existing values
    const usersRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A2:L',
    });

    const users = usersRes.data.values || [];
    const userRow = users.find((row) => row[0] === id);

    if (!userRow) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Get the row index of the user
    const rowIndex = users.indexOf(userRow) + 2; // +2 to account for header row and 1-based index

    // Merge existing data with new data
    const [user_id, existingUsername, existingName, existingEmail, existingPassword, existingStatus, existingRole, existingDepartment, existingJoinDate, existingAvatar, existingBio, existingSkills] = userRow;

    const updatedName = name || existingName;
    const updatedEmail = email || existingEmail;
    const updatedRole = role || existingRole;
    const updatedDepartment = department || existingDepartment;
    const updatedBio = bio || existingBio;

    // Ensure skills is an array
    const updatedSkills = Array.isArray(skills) ? skills : existingSkills ? existingSkills.split(',') : [];

    // Update the user data in Google Sheets
    const range = `Users!A${rowIndex}:L${rowIndex}`;
    const values = [
      [
        user_id,
        existingUsername, // Ensure username is not overwritten
        updatedName,
        updatedEmail,
        existingPassword, // Ensure password is not overwritten
        existingStatus,   // Ensure status is not overwritten
        updatedRole,
        updatedDepartment,
        existingJoinDate, // Ensure join date is not overwritten
        existingAvatar,  // Ensure avatar is not overwritten
        updatedBio,
        updatedSkills.join(','),
      ],
    ];
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}