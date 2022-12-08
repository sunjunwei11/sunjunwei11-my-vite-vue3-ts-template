import { ElMessage } from 'element-plus';
import { ref } from 'vue';

import { updateTokenBalance, mintToken } from '@/wallet';

function useMintToken() {
  const minting = ref(false);
  const doMintToken = async () => {
    try {
      minting.value = true;
      await mintToken();
      await updateTokenBalance();
    } catch (error: any) {
      console.error(error);
      ElMessage({
        message: error.message || 'Mint Fail',
        type: 'error',
      });
    } finally {
      minting.value = false;
    }
  };

  return { minting, doMintToken };
}

export { useMintToken };
