// /app/api/session/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map(c => c.split('=')));

  if (cookies.session) {
    const session = JSON.parse(decodeURIComponent(cookies.session));
    return NextResponse.json({ loggedIn: true, session });
  } else {
    return NextResponse.json({ loggedIn: false });
  }
}
