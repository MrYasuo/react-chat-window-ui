import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	test: {
		globals: false,
		environment: "jsdom",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src/lib"),
		},
	},
});
