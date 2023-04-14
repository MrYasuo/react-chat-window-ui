import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/lib"),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/lib/index.jsx"),
			name: "React Chat Window UI",
			fileName: (format) => `react-chat-window-ui.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
});
