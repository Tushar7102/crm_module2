import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  
  // Clear the auth token cookie
  cookieStore.delete('auth-token');
  
  return NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  );
}