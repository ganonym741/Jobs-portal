import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function digitSeparation(numberValue: number, by?: string) {
  if (isNaN(numberValue)) {
    return '0';
  }

  const tempCurrency = numberValue?.toString();
  const remainder = tempCurrency?.length % 3;
  let digit = tempCurrency?.substr(0, remainder);
  const thousand = tempCurrency?.substr(remainder).match(/\d{3}/g);

  if (thousand) {
    const separator = remainder ? by ?? '.' : '';

    digit += separator + thousand.join(by ?? '.');
  }

  return digit;
}

export function getMonthName(monthNumber: number): string {
  const date = new Date();

  date.setMonth(monthNumber - 1);

  return date.toLocaleString('default', { month: 'long' });
}

export function getEnumValues<T extends string>(...args: T[]): T[] {
  return args;
}

export const decodeHtml = (html: string) => {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/');
};