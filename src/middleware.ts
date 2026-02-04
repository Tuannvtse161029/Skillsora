import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SIGNIN_ROUTE, HOME_ROUTE } from './constants/routes';

// Các route không cần đăng nhập vẫn xem được
const publicRoutes = ['/', '/signin', '/signup', '/blog', '/privacy', '/about'];
// Các route chỉ dành cho người chưa đăng nhập (vào rồi thì không cho quay lại)
const authRoutes = ['/signin', '/signup'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('__accessToken')?.value;
    const { pathname } = request.nextUrl;

    // 1. Nếu đã đăng nhập mà cố vào trang Login/Signup -> Về Home
    if (token && authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
    }

    // 2. Nếu chưa đăng nhập mà vào các trang Private (không nằm trong publicRoutes) -> Về Login
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

    if (!token && !isPublicRoute) {
        const loginUrl = new URL(SIGNIN_ROUTE, request.url);
        // Lưu lại trang định vào để sau khi login xong quay lại (tùy chọn)
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