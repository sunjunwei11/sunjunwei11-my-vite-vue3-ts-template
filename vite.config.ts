/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.tsx$/],
    },
  },
  plugins: [vueJsx(), vue()],
  resolve: {
    alias: [
      {
        find: '@/',
        replacement: join(__dirname, 'src/'),
      },
    ],
  },
});
