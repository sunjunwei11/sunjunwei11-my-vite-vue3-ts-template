import { createApp } from 'vue';
import '@/styles/index.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import elementByNeed from '@/plugins/elememtByNeed';
import elementPlusIcons from '@/plugins/elementIcons';

createApp(App)
  .use(router)
  .use(store)
  .use(elementByNeed)
  .use(elementPlusIcons)
  .mount('#app');
