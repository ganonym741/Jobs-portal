import type { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'id'] as const;
export const localesDetail = [
  {
    label: 'Bahasa',
    value: 'id',
  },
  {
    label: 'English',
    value: 'en',
  },
] as const;
export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/pathnames': {
    en: '/en',
    id: '/id',
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';
