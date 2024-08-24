import type { ApiResponse } from "@/types";

export enum GENDER {
  'Male' = 'Male',
  'Female' = 'Female',
}

export interface User {
  id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  birth_date: Date;
  gender: GENDER;
  address: string;
  city: string;
  province: string;
  profile_desc?: string;
  phone_number: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface GetProfileResDto extends ApiResponse<User> {}

export interface CreateUserReqDto extends User {}

export interface UpdateUserReqDto extends Partial<CreateUserReqDto> {}