<template>
  <div class="header">
    <img class="logo" :src="logo" />
    <div>Build Web3</div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.png';
</script>

<style scoped lang="scss">
.header {
  height: 60px;
  color: #42b983;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-items: start;
  .logo {
    width: 150px;
    height: auto;
    display: block;
    margin-right: 10px;
  }
  box-shadow: 0 0 6px 6px #d0cccc;
}
</style>
