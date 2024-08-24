import request from '../base/axios';
import type { UserLoginReqDto, UserLoginResponse } from '../dto/auth.dto';

const Auth = {
  signin: (params: UserLoginReqDto): Promise<UserLoginResponse["data"]> => request.post('/login', params).then((res)=>res.data),
};

export default Auth;
