<template>
  <div class="nfts-wrap" v-loading="loading">
    <div class="no-nft" v-if="!loading && !nfts.length">
      You have no Digi Girls Nft now, You can Mint for free
    </div>
    <template v-else>
      <div class="nft-item" v-for="nft in nfts" :key="nft.tokenId">
        <img class="nft-img" :src="nft.image" />
        <div class="nft-info">
          <div class="info-item">{{ nft.name }}</div>
          <div class="info-item">ID: {{ nft.tokenId }}</div>
          <div class="info-item">Hair Color: {{ nft.hairColor }}</div>
          <div class="info-item">Cloth: {{ nft.cloth }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
interface Props {
  loading: boolean;
  nfts: any[];
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.nfts-wrap {
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
  .nft-item {
    width: 200px;
    height: 360px;
    margin-right: 30px;
    margin-bottom: 20px;
    border-radius: 6px;
    overflow: hidden;
    font-size: 14px;
    box-shadow: 0 0 6px 8px #f0e9e9;
    .nft-img {
      width: 200px;
      height: 200px;
    }
    .nft-info {
      padding: 10px;
      .info-item {
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
}
.no-nft {
  margin-top: 30px;
  flex: 1;
  text-align: center;
}
</style>
