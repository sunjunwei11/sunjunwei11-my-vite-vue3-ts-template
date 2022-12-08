import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

// 当前要测试的环境，链接中带有?network=goerli则为测试环境，否则是线上环境
export const useNetworkStore = defineStore('network', () => {
  const goerliNetworkId = '5';
  const ethNetworkId = '1';
  const networkId: Ref<string> = ref('');
  const isGoerliTestNetWork = ref(false);

  function checkNetWork(route: RouteLocationNormalizedLoaded) {
    isGoerliTestNetWork.value = route.query.network === 'goerli';
    networkId.value = isGoerliTestNetWork.value
      ? goerliNetworkId
      : ethNetworkId;
  }

  return { networkId, isGoerliTestNetWork, checkNetWork };
});
