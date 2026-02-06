import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SIGNIN_ROUTE, HOME_ROUTE } from './constants/routes';

const publicRoutes = ['/', '/signin', '/signup', '/blog', '/privacy', '/about'];
const authRoutes = ['/signin', '/signup'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('__accessToken')?.value;
    const { pathname } = request.nextUrl;
    const signUpSessionId = request.cookies.get('__signUpSessionId')?.value;
    const signUpExpiredTime = request.cookies.get('__signUpExpiredTime')?.value;

    if (token && authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
    }

    if (pathname.startsWith('/verify')) {
        if (!signUpSessionId || !signUpExpiredTime) {
            return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
        }
    }

    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

    if (!token && !isPublicRoute) {
        const loginUrl = new URL(SIGNIN_ROUTE, request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images, fonts... (static assets)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};