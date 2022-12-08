import {
  useCurrentAddressStore,
  useContractAddressStore,
  useTokenStore,
} from '@/store';
import { storeToRefs } from 'pinia';

function useAddressInfo() {
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = storeToRefs(currentAddressStore);

  const contractAddressStore = useContractAddressStore();
  const { tokenContractAddress } = storeToRefs(contractAddressStore);

  const tokenStore = useTokenStore();
  const { tokenBalance } = storeToRefs(tokenStore);

  return {
    currentAddress,
    tokenContractAddress,
    tokenBalance,
  };
}

export { useAddressInfo };
