import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { updateNftBalance, mintNft } from '@/wallet';

function useMint() {
  const minting = ref(false);
  const doMintNft = async () => {
    try {
      minting.value = true;
      await mintNft();
      await updateNftBalance();
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
  return { minting, doMintNft };
}

export { useMint };
