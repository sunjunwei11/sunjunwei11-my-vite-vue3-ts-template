import { defineStore } from 'pinia';
import { Contract } from 'ethers';

type ContractType = Contract | null;
type Contracts = {
  tokenContract: ContractType;
  nftContract: ContractType;
};

// 合约实例
export const useContractStore = defineStore('Contract', () => {
  const contracts: Contracts = {
    tokenContract: null,
    nftContract: null,
  };
  // Token合约实例
  const setTokenContract = (contract: ContractType) => {
    contracts.tokenContract = contract;
  };

  // NFT合约实例
  const setNftContract = (contract: ContractType) => {
    contracts.nftContract = contract;
  };
  return { contracts, setTokenContract, setNftContract };
});
