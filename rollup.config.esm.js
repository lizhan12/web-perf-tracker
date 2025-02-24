import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'; // 引入 terser 插件

const pkgName = 'web-perf-tracker';
const camelCase = (str) => str.replace(/-([a-z])/g, (g) => g.toUpperCase());

export default defineConfig({
	input: './src/webvital/baseTrace.ts',
	output: [
		
		// ESM格式（现代模块）
		{
			dir: 'dist/esm',
			format: 'esm',
			entryFileNames: `${pkgName}.mjs`,
		},
	
	],
	plugins: [
		nodeResolve({ browser: true }), // 浏览器路径解析
		// commonjs({ extensions: ['.js', '.ts'] }), // 兼容CJS转换
		typescript({
			module: 'ESNext',
			declaration: true,
			declarationDir: 'dist/esm/types', // 声明文件子目录
			outDir: 'dist/esm', // 必须与Rollup dir一致
			rootDir: 'src'
		}),
	],
});
