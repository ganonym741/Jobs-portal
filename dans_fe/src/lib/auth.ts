'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getIronSession } from 'iron-session';

import type { SessionData } from '@/types/sessions';
import { sessionOptions } from '@/types/sessions';

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return session;
};

export const getToken = async () => {
  const session = await getSession();

  return session.jwt?.token?.toString() || undefined;
};

export const setLogin = async (data: SessionData) => {
  const session = await getSession();

  session.user = data.user;
  session.jwt = data.jwt;

  await session.save();
  redirect('/jobs');
};

export const logout = async () => {
  const session = await getSession();

  session.destroy();
  redirect('/login');
};
