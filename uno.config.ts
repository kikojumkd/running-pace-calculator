import { defineConfig, presetWind } from 'unocss';

export default defineConfig({
	presets: [presetWind()],
	content: {
		pipeline: {
			include: [/\.(svelte|[jt]sx?)($|\?)/, 'src/**/*.ts']
		}
	}
});
