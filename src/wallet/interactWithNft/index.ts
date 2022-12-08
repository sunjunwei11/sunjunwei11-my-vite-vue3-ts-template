import { Contract } from 'ethers';
import { ElMessage } from 'element-plus';
import { useContractStore, useCurrentAddressStore, useNftStore } from '@/store';
import { getRandomNft } from '../utils';

// Returns the owner of the tokenId token.
async function getOwnerOf(tokenId: number) {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract: contract },
  } = contractStore;
  const address = await (contract as Contract).ownerOf(tokenId);
  return address;
}

async function updateNftBalance() {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract },
  } = contractStore;
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = currentAddressStore;
  if (!nftContract || !currentAddress) return;
  const balance = await nftContract.balanceOf(currentAddress);

  const tokenStore = useNftStore();
  const { setNftBalance } = tokenStore;
  setNftBalance(balance);
}

async function mintNft() {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract },
  } = contractStore;
  const tx = await (nftContract as Contract)
    .safeMint(`https://ipfs.io/ipfs/${getRandomNft()}`)
    .catch((error: any) => {
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
      ? 'Congratulations!! You Mint a Digi girl Nft Sucessfully'
      : 'Mint Fail',
    type: receipt.status ? 'success' : 'error',
  });
}

async function getTokenOfOwnerByIndex(address: string, index: number) {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract: contract },
  } = contractStore;
  const tokenId = await (contract as Contract).tokenOfOwnerByIndex(
    address,
    index
  );
  return tokenId;
}

// Returns the Uniform Resource Identifier (URI) for tokenId token.
async function getTokenURI(tokenId: number) {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract: contract },
  } = contractStore;
  const tokenUri = await (contract as Contract).tokenURI(tokenId);
  return tokenUri;
}

// Returns the total amount of tokens stored by the contract.
async function getTotalSupply() {
  const contractStore = useContractStore();
  const {
    contracts: { nftContract: contract },
  } = contractStore;
  const total = await (contract as Contract).totalSupply();
  return total;
}

export {
  getOwnerOf,
  updateNftBalance,
  mintNft,
  getTokenOfOwnerByIndex,
  getTokenURI,
  getTotalSupply,
};
