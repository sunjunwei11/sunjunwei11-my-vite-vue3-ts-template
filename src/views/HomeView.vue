<template>
  <div>This is Home Page</div>
  <button @click="increment">counter from store {{ count }}</button>
  <HelloTsx />
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import HelloTsx from '@/components/HelloTsx';
import { useCounterStore } from '@/store';
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<style scoped></style>
