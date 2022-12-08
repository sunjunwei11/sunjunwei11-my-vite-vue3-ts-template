import {
  useCurrentAddressStore,
  useContractAddressStore,
  useNftStore,
} from '@/store';
import { storeToRefs } from 'pinia';

function useAddressInfo() {
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = storeToRefs(currentAddressStore);

  const contractAddressStore = useContractAddressStore();
  const { nftContractAddress } = storeToRefs(contractAddressStore);

  const tokenStore = useNftStore();
  const { nftBalance } = storeToRefs(tokenStore);

  return {
    currentAddress,
    nftContractAddress,
    nftBalance,
  };
}

export { useAddressInfo };
