import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { getSession } from "./lib/auth";

const publicPages = [
'/',
'/login',
'/register',
];

import { locales } from '@/config';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  );

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

  if (!isPublicPage && !session.user) {
    request.nextUrl.pathname = "/login"
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: 'en',
  });

  const response = handleI18nRouting(request);

  return response;
}

// See 'Matching Paths' below to learn more
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
