import { ElMessage } from 'element-plus';
import { useNetworkStore, useContractAddressStore } from '@/store';

// 检查选择的网络是否正确
function isNetworkRight() {
  const networkStore = useNetworkStore();
  const { networkId } = networkStore;
  if (window.ethereum!.networkVersion == networkId) {
    return true;
  }

  ElMessage({
    message: 'Please select the right network',
    type: 'error',
  });

  return false;
}

// 添加Token到Metamask钱包
async function addToken2Metamask() {
  if (!isNetworkRight()) return;

  const contractAddressStore = useContractAddressStore();
  const { tokenContractAddress } = contractAddressStore;
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await window.ethereum!.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenContractAddress, // The address that the token is at.
        symbol: 'BuildWeb3', // A ticker symbol or shorthand, up to 5 chars.
        decimals: 18, // The number of decimals in the token
        // image: tokenImage, // A string url of the token logo
      },
    },
  });

  ElMessage({
    message: wasAdded ? 'Add Successful' : 'Add fail',
    type: wasAdded ? 'success' : 'error',
  });
}

const nftJsons = [
  'QmYUhzs8FsVaxRSB8fFbohfVzgNR5MHXbcvj9rkYYYCKJX',
  'Qmep7jzBATwNamThnnNP3rgeSXe89Cc5bQvriehbYfjkoW',
  'QmNYREkCgNuoMctYMf8vuD9m89nnXVJpXtvQj9su46Nvr8',
  'QmboJosjAuYo2Jg2Ar6xjfX7mCtYpnhrqeQ9M1N9e73UiC',
  'QmeznKyVm5BPUPMdWi4kzAa6K2Qd296RJYpz6UaaCn75Wt',
  'QmaGP1Kjp5wRuGnfg8fP1Xvb7PSnVn3BeStkGmFdbDxxTN',
  'QmSTpn38fFcSZhP73pFzFYMbjncEpz1WPJqurh8HfJRaYA',
  'QmZziJVzpCfV1FrRq83M1SQk7tecdBeuh8EZiQpPWjUFLZ',
  'QmUjvXFN9A1TGGncrqvJC43kGZyhdzQnGDyXGaoDmFGBjt',
  'QmSafUJ2acrusnViHxM3gPQLiwBcTYd3iejw2ai146tDCL',
  'Qme6ivPHxphPgMUHUhyjbNPbHT1uTEhHZ1HF4SRdFNEYC9',
  'QmVZ1UQETV5oabMBFc2BhQ74vhZsamHfhFqtUGx3nS8jpS',
];

const getRandomNft = () => {
  const nftLength = nftJsons.length;
  const randomNum = Math.floor(Math.random() * nftLength);
  const selectedNft = nftJsons[randomNum];
  return selectedNft;
};

export { isNetworkRight, addToken2Metamask, getRandomNft };
