'use server';

import type { RedirectType } from 'next/navigation';
import { redirect } from 'next/navigation';

export async function navigate(to: string, type?: RedirectType) {
  redirect(to, type);
}
