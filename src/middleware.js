import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';



export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET});
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/login') || pathname.startsWith('/forget-password') || pathname.startsWith('/register')) {
    if (token) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
