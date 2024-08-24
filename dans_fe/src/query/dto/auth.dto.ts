import type { ApiResponse } from '@/types';
import type { User } from './user.dto';

export interface TokenDto {
  token: string;
  token_expired: Date;
}

export interface UserLoginReqDto {
  username: string;
  password: string;
}

export interface UserLoginResponse
  extends ApiResponse<{ jwt: TokenDto} & Partial<User>> {}
