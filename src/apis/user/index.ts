import { get, post } from '@/utils/request';
import { LoginParams, LoginRes, UserInfoParams, UserInfoRes } from './types';

const login = (params: LoginParams) => {
  return post<LoginRes>('/login', params);
};

const getUserInfo = (params: UserInfoParams) => {
  return get<UserInfoRes>('/userinfo', { params });
};

export { login, getUserInfo };
