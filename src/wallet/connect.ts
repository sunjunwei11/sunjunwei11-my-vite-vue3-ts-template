import { useCurrentAddressStore } from '@/store';
import { isNetworkRight } from './utils';

// 连接钱包
async function connectWallet() {
  if (!isNetworkRight()) return;

  const [selectedAddress] = (await window.ethereum!.request({
    method: 'eth_requestAccounts',
  })) as string[];

  const currentAddressStore = useCurrentAddressStore();
  const { setCurrentAddress } = currentAddressStore;
  setCurrentAddress(selectedAddress);

  //   initializeEthers(selectedAddress);

  //   console.log(selectedAddress);
}

export { connectWallet };
