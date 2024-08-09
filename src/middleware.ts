import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export { default } from 'next-auth/middleware';

export async function middleware(request: any) {
  const token = await getToken({ req: request });

  if (!token) {
    return NextResponse.redirect('http://localhost:3000/forbidden');
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard', '/addCompany', '/organizations'],
};
