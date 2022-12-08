<template>
  <div>
    <el-alert
      title="Digi Girls Nft"
      type="info"
      description="Digi Girls Nft is a test project, the Nft img is copy from the famous project of DigiDaigaku"
      :closable="false"
    />
    <div class="contract-address" v-if="nftContractAddress">
      Contract Address:
      <el-tag type="warning">{{ nftContractAddress }}</el-tag>
    </div>
    <div class="contract-address" v-if="nftContractAddress">
      OpenSea Address:
      <el-tag type="warning"
        >https://opensea.io/collection/digi-girls-gogogo</el-tag
      >
    </div>
    <el-divider />
    <template v-if="!currentAddress">
      <el-button type="success" @click="doConnectWallet"
        >Connect Wallet</el-button
      >
    </template>
    <template v-else>
      <div class="current-address" v-if="currentAddress">
        Wallet Connetted!! Current Address:
        <el-tag type="success">{{ currentAddress }}</el-tag>
      </div>
      <div class="current-address" v-if="currentAddress">
        You have
        <el-tag class="ml-2" type="success" v-loading="nftBalanceIsLoading">{{
          nftBalance
        }}</el-tag>
        Digi Girls
      </div>
      <el-divider />
      <el-button type="success" @click="doMintNft" :loading="minting">
        Mint Nft
      </el-button>
      <el-divider />
      <el-tabs v-model="nftTab" class="demo-tabs" @tab-change="handleTabChange">
        <el-tab-pane label="All Minted Nft" :name="NftTab.All">
          <NftsCard :nfts="allNfts" :loading="allNftLoading" />
        </el-tab-pane>
        <el-tab-pane label="My Minted Nft" :name="NftTab.My">
          <NftsCard :nfts="myNfts" :loading="myNftLoading"
        /></el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  connectWallet,
  initializeNftContract,
  updateNftBalance,
} from '@/wallet';
import NftsCard from './NftsCard.vue';

import { useGetNfts, useAddressInfo, useMint } from './hooks';

// 获取地址、nft Mint数量相关逻辑
const { currentAddress, nftContractAddress, nftBalance } = useAddressInfo();

// Mint相关逻辑
const { doMintNft, minting } = useMint();

// 获取Nft列表相关逻辑
const {
  handleTabChange,
  getNfts,
  allNftLoading,
  myNftLoading,
  allNfts,
  myNfts,
  nftTab,
  NftTab,
} = useGetNfts();

onMounted(async () => {
  await init();
  await getNfts();
});

// 组件挂载或者连接钱包后需要进行合约的初始化工作，并且与链上交互获取token相关信息
const nftBalanceIsLoading = ref(true);
const init = async () => {
  if (!currentAddress) return;
  nftBalanceIsLoading.value = true;
  await initializeNftContract();
  await updateNftBalance();
  nftBalanceIsLoading.value = false;
};

const doConnectWallet = async () => {
  await connectWallet();
  await init();
};
</script>

<style scoped lang="scss">
.current-address {
  font-size: 12px;
  margin-bottom: 15px;
}
.contract-address {
  font-size: 12px;
  margin: 15px 0;
}
</style>
