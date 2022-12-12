<template>
  <div>This is Home Page</div>
  <ElButton @click="increment">counter from store {{ count }}</ElButton>
  <ElDivider />
  <HelloTsx />
  <HelloWorld msg="Vite + Vue" />
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import HelloTsx from '@/components/HelloTsx';
import { useCounterStore } from '@/store';
import { storeToRefs } from 'pinia';

// import { userApi } from '@/apis';
// const userInfo = await userApi.getUserInfo({ userId: '111' });

// import { getUserInfo } from '@/apis/modules/user';
// const userInfo = await getUserInfo({ userId: '111' });
// console.log(userInfo);

const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment } = counterStore;
</script>

<style scoped></style>
