<template>
  <div>This is About Page</div>
  <ElButton @click="increment">counter from store {{ count }}</ElButton>

  <div>This is Edit Icon:</div>
  <el-icon><IEpArrowLeft /></el-icon>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store';
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<style scoped></style>
