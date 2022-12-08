import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';

// 合约实例
export const useNftStore = defineStore('nft', () => {
  const nftBalance: Ref<string> = ref('0');
  const setNftBalance = (balance: string) => {
    nftBalance.value = balance;
  };
  return {
    nftBalance,
    setNftBalance,
  };
});
