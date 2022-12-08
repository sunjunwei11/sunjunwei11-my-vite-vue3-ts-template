import { defineStore, storeToRefs } from 'pinia';
import { ref, Ref, computed } from 'vue';
import { useNetworkStore } from './network';

// 当前选择的钱包地址
export const useCurrentAddressStore = defineStore('currentAddress', () => {
  const currentAddress: Ref<string> = ref('');
  function setCurrentAddress(val: string) {
    currentAddress.value = val;
  }

  return { currentAddress, setCurrentAddress };
});

// 合约地址，不同的network对应的合约地址不一样
export const useContractAddressStore = defineStore('contractAddress', () => {
  const network = useNetworkStore();
  const { isGoerliTestNetWork } = storeToRefs(network);
  const goerliContractAddress = '0x93C3FFaE436BfDB07Ea9D67a69cf8a5fF90d2512';
  const ethContractAddress = '0x72F7A1F6eB1a799eb5Ce736916bfF44F323f6768';
  const tokenContractAddress = computed(() =>
    isGoerliTestNetWork.value ? goerliContractAddress : ethContractAddress
  );

  const goerliNftContractAddress = '0x3E1F3A5e0Ab6a8555eB0489D991a3312958D05b3';
  const ethNftContractAddress = '0xAE1876C9a02AfCD0Cd4d20fCcf279b07cb0E1F72';
  const nftContractAddress = computed(() =>
    isGoerliTestNetWork.value ? goerliNftContractAddress : ethNftContractAddress
  );

  return {
    tokenContractAddress,
    nftContractAddress,
  };
});
