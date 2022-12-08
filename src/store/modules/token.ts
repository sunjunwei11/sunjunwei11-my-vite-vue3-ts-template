import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';

// 合约实例
export const useTokenStore = defineStore('token', () => {
  const tokenBalance: Ref<string> = ref('0');
  const setTokenBalance = (balance: string) => {
    tokenBalance.value = balance;
  };
  return {
    tokenBalance,
    setTokenBalance,
  };
});
