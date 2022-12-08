<template>
  <div>This is About Page</div>
  <button @click="increment">counter from store {{ count }}</button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/store';
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<style scoped></style>
