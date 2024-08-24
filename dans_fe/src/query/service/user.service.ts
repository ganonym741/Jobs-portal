import type { ApiResponse } from '@/types';
import request from '../base/axios';
import type { CreateUserReqDto, UpdateUserReqDto, User } from '../dto/user.dto';

const User = {
  getProfile: (): Promise<User> => request.get('/user/profile').then((res) => res.data),
  editProfile: (payload: UpdateUserReqDto): Promise<ApiResponse<any>> => request.put('/user', payload).then((res) => res),
  register: (payload: CreateUserReqDto): Promise<ApiResponse<any>> => request.post('/user/register', payload).then((res) => res),
};

export default User;
