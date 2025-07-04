import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return NextResponse.json(
      { authenticated: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  // In a real application, you would verify the token with your backend
  // For now, we'll just check if it exists
  return NextResponse.json(
    { authenticated: true, message: 'Authenticated' },
    { status: 200 }
  );
}