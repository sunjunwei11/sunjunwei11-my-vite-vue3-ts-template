import { ethers, Contract } from 'ethers';
import { ElMessage } from 'element-plus';
import {
  useContractStore,
  useCurrentAddressStore,
  useTokenStore,
} from '@/store';

async function updateTokenBalance() {
  const contractStore = useContractStore();
  const {
    contracts: { tokenContract },
  } = contractStore;
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = currentAddressStore;
  if (!tokenContract || !currentAddress) return;
  const balance = ethers.utils.formatEther(
    await tokenContract.balanceOf(currentAddress)
  );

  const tokenStore = useTokenStore();
  const { setTokenBalance } = tokenStore;
  setTokenBalance(balance);
}

async function mintToken() {
  const contractStore = useContractStore();
  const {
    contracts: { tokenContract },
  } = contractStore;
  const tx = await (tokenContract as Contract).mint().catch((error: any) => {
    if (error?.code === 'ACTION_REJECTED') {
      return;
    }
    throw new Error('Mint failed');
  });
  // We use .wait() to wait for the transaction to be mined. This method
  // returns the transaction's receipt.
  const receipt = await tx.wait();

  // The receipt, contains a status flag, which is 0 to indicate an error.
  if (receipt.status === 0) {
    // We can't know the exact error that made the transaction fail when it
    // was mined, so we throw this generic one.
    throw new Error('Transaction failed');
  }
  ElMessage({
    message: receipt.status
      ? "Congratulations!! You get 10M 'BuildWeb3' Token"
      : 'Mint Fail',
    type: receipt.status ? 'success' : 'error',
  });
}

export { updateTokenBalance, mintToken };
