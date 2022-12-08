import { ethers, Contract } from 'ethers';
import { useContractAddressStore, useContractStore } from '@/store';
import TokenArtifact from '@/contract/BuildWeb3Token.json';
import NftArtifact from '@/contract/MyDigiNft.json';

// 初始化Token合约
async function initializeTokenContract(): Promise<Contract> {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  const signer = provider.getSigner(0);
  console.log('signer:', signer);

  const contractAddressStore = useContractAddressStore();
  const { tokenContractAddress } = contractAddressStore;

  const contractStore = useContractStore();
  const { setTokenContract } = contractStore;

  const tokenContract = await new ethers.Contract(
    tokenContractAddress,
    TokenArtifact.abi,
    signer
  );

  setTokenContract(tokenContract);

  return tokenContract;
}

// 初始化Nft合约
async function initializeNftContract(): Promise<Contract> {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);

  const signer = provider.getSigner(0);
  console.log('signer:', signer);

  const contractAddressStore = useContractAddressStore();
  const { nftContractAddress } = contractAddressStore;

  const contractStore = useContractStore();
  const { setNftContract } = contractStore;

  const nftContract = await new ethers.Contract(
    nftContractAddress,
    NftArtifact.abi,
    signer
  );

  setNftContract(nftContract);

  return nftContract;
}

export { initializeTokenContract, initializeNftContract };
