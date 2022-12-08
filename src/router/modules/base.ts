import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: () => {
      return { name: 'mintToken' };
    },
  },
  {
    path: '/mint-token',
    name: 'mintToken',
    component: () => import('@/views/MintToken'),
  },
  {
    path: '/mint-nft',
    name: 'mintNft',
    component: () => import('@/views/MintNft'),
  },
];

export default routes;
