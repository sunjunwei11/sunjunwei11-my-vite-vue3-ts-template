import { get, post } from '@/utils/request';
import {
  AddShopParams,
  AddShopRes,
  GetShopDetailParams,
  GetShopDetailRes,
} from './types';

const addShop = (params: AddShopParams) => {
  return post<AddShopRes>('/addShop', params);
};

const getShopDetail = (params: GetShopDetailParams) => {
  return get<GetShopDetailRes>('/shopDetail', { params });
};

export { addShop, getShopDetail };
