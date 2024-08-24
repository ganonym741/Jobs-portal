import type { SessionOptions } from 'iron-session';

import type { User } from '@/query/dto/user.dto';

export interface SessionData {
  user: User;
  jwt: {
    token: string;
    token_expired: string;
  };
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: 'fix-fe',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
