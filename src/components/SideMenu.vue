<template>
  <el-menu class="menu">
    <el-menu-item index="1">
      <router-link
        :to="{ name: 'mintToken', query: { ...route.query } }"
        class="menu-item"
        activeClass="menu-item-actived"
      >
        <el-icon><Apple /></el-icon>
        <span>Mint Token</span>
      </router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link
        :to="{ name: 'mintNft', query: { ...route.query } }"
        class="menu-item"
        activeClass="menu-item-actived"
      >
        <el-icon><MilkTea /></el-icon>
        <span>Mint Nft</span>
      </router-link>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style lang="scss" scoped>
.menu-item {
  text-decoration: none;
  color: #2c3e50;
  flex: 1;
  justify-items: flex-start;
  text-align: left;
}
.menu-item-actived {
  font-size: 16px;
  font-weight: bold;
  color: #42b983;
}
</style>
