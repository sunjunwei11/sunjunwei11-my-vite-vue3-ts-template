import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export * from './modules/address';
export * from './modules/network';
export * from './modules/contract';
export * from './modules/token';
export * from './modules/nft';
