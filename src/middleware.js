import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  // console.log("Token: ", token);
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register'];
  if (publicPaths.includes(path)) {
    // If user is already authenticated, redirect to home
    if (token) {
      console.log("User is authenticated, redirecting to home.");
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const adminPaths = ['/admin'];
  if (adminPaths.includes(path)) {
    // console.log("Checking admin access for path:", path);
    // console.log("Is user admin?", token.isAdmin);
    if (!token.isAdmin) {
      // console.log("User is not admin, redirecting to home.");
      return NextResponse.redirect(new URL('/', request.url));
    }
    // console.log("User is admin, allowing access.");
  }

  // Allow the request to continue
  // console.log("Allowing request to continue.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};