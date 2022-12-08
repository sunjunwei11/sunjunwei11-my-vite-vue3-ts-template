// 按需引入element组件
//
import { App } from 'vue';

import {
  ElAlert,
  ElTag,
  ElContainer,
  ElHeader,
  ElMain,
  ElButton,
  ElAside,
  ElDivider,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElIcon,
  ElLoading,
  ElMessage,
} from 'element-plus';

// ElMessage没有在模板里使用，而是作为函数使用，这种情况需要手动引入CSS
import 'element-plus/es/components/message/style/index';

const plugins = [
  ElAlert,
  ElTag,
  ElContainer,
  ElHeader,
  ElMain,
  ElButton,
  ElAside,
  ElDivider,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElIcon,
  ElLoading,
  ElMessage,
];

function useElement(app: App) {
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}

export default {
  install: useElement,
};
