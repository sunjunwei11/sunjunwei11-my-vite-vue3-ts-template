<template>
  <div>
    <el-alert
      title="'BuildWeb3' Token Introduce"
      type="info"
      description="'BuildWeb3' Token is a free mint MEME token, you can spend a little gas to mint 10M for fun."
      :closable="false"
    />
    <div class="contract-address" v-if="tokenContractAddress">
      Contract Address:
      <el-tag type="warning">{{ tokenContractAddress }}</el-tag>
    </div>
    <el-divider />
    <template v-if="!currentAddress">
      <el-button type="success" @click="doConnectWallet">
        Connect Wallet
      </el-button>
    </template>
    <template v-else>
      <div class="current-address" v-if="currentAddress">
        Wallet Connetted!! Wallet Address:
        <el-tag type="success">{{ currentAddress }}</el-tag>
      </div>
      <div class="current-address" v-if="currentAddress">
        You have
        <el-tag class="ml-2" type="success" v-loading="tokenBalanceIsLoading">
          {{ tokenBalance }}
        </el-tag>
        BuildWeb3 Token
      </div>
      <el-button type="success" @click="doMintToken" :loading="minting"
        >Free Mint</el-button
      >
      <el-divider />
      <el-button type="primary" @click="addToken2Metamask"
        >Add "BuildWeb3" Token to Metamask</el-button
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import {
  connectWallet,
  initializeTokenContract,
  updateTokenBalance,
  addToken2Metamask,
} from '@/wallet';

import { useAddressInfo, useMintToken } from './hooks';

// 获取地址相关逻辑
const { currentAddress, tokenContractAddress, tokenBalance } = useAddressInfo();

// Mint相关逻辑
const { minting, doMintToken } = useMintToken();

// 组件挂载或者连接钱包后需要进行合约的初始化工作，并且与链上交互获取token相关信息
const tokenBalanceIsLoading = ref(true);
const init = async () => {
  if (!currentAddress) return;
  tokenBalanceIsLoading.value = true;
  await initializeTokenContract();
  await updateTokenBalance();
  tokenBalanceIsLoading.value = false;
};

const doConnectWallet = async () => {
  await connectWallet();
  await init();
};

onMounted(async () => {
  await init();
});
</script>

<style lang="scss" scoped>
.current-address {
  font-size: 12px;
  margin-bottom: 15px;
}
.contract-address {
  font-size: 12px;
  margin: 15px 0;
}
</style>
