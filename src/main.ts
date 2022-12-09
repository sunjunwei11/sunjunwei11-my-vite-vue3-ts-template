import { createApp } from 'vue';
import '@/styles/index.scss';
import '@/styles/elementCom';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(router).use(store).mount('#app');
