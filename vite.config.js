import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/dark-mode-toggle.js',
      name: 'DarkModeToggle',        // iife 全局变量名
      fileName: (format) => `dark-mode-toggle.${format}.js`,
      formats: ['es', 'iife'],       // 去掉 legacy 后就能正常打包
    },
    // 让大图走 assets，小图自动 base64
    assetsInlineLimit: 4096, // 默认 4096，可按需调
  },
});