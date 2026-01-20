import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/dark-mode-toggle.js",
			name: "DarkModeToggle",
			formats: ["es", "umd"],
			fileName: (format) => `dark-mode-toggle.${format}.js`,
		},
		assetsInlineLimit: 4096,
		minify: "esbuild", // 启用代码压缩
		sourcemap: true, // 生成源映射文件，便于调试
	},
});
