import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/dark-mode-toggle.js',
      name: 'DarkModeToggle',
      fileName: (format) => `dark-mode-toggle.${format}.js`,
      formats: ['es', 'iife'],
    },
    assetsInlineLimit: 4096,
  },
});