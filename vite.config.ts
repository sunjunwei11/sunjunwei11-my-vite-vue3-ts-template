/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.tsx$/],
    },
  },
  plugins: [
    vueJsx(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: join(__dirname, 'src/'),
      },
    ],
  },
  build: {
    target: 'es2015', // 构建出来的产物支持的环境 https://cn.vitejs.dev/guide/build.html
  },
});
