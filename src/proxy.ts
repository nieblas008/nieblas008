import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const locales = ['en', 'es'];
const defaultLocale = 'en';

function getLocale(request: NextRequest) {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;

  const languages = new Negotiator({ headers: { 'accept-language': acceptLanguage } }).languages();
  return match(languages, locales, defaultLocale);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let supabaseResponse = NextResponse.next({ request });

  // 1. Only run heavy Supabase auth checks if accessing securely protected routes
  if (pathname.startsWith('/admin')) {
    supabaseResponse = await updateSession(request);

    // If Supabase triggered a redirect (e.g. to /admin/login), prioritize it
    if (supabaseResponse.headers.get('Location')) {
      return supabaseResponse;
    }
  }

  // Skip if it is a public file, API route, or the admin dashboard
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.includes('/api/') ||
    pathname.match(/\.(png|jpg|jpeg|svg|ico)$/)
  ) {
    return supabaseResponse;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return supabaseResponse;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const redirectResponse = NextResponse.redirect(request.nextUrl);

  // Forward any Supabase cookies to the new redirected response
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });

  return redirectResponse;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
