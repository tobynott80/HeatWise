// /pages/api/admin/logout.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req) {
  try {
    const cookieStore = cookies(req);
    cookieStore.delete('token', { path: '/' }); // Delete the token

    return NextResponse.json({ success: true }); // Indicate successful logout
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
  }
}
