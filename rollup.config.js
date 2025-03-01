import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; // 引入 terser 插件

const pkgName = 'web-perf-tracker';
const camelCase = (str) => str.replace(/-([a-z])/g, (g) => g.toUpperCase());
console.log(camelCase(pkgName).replaceAll("-", ""))
export default defineConfig({
	input: './src/webvital/baseTrace.ts',
	output: [
		{
			file: `dist/umd/${pkgName}.umd.js`,
			format: 'umd',
			name: camelCase(pkgName).replaceAll("-", ""), // 自动转驼峰命名
			globals: { lodash: '_' }, // 声明外部依赖
			plugins: [terser()], // 默认压缩
		},

		// CJS格式（传统模块）
		{
			dir: 'dist/cjs',
			format: 'cjs',
			exports: 'auto',
			entryFileNames: `${pkgName}.cjs`,
		},
	],
	plugins: [
		nodeResolve({ browser: true }), // 浏览器路径解析
		commonjs({ extensions: ['.js', '.ts'] }), // 兼容CJS转换
		typescript({
			module: 'ESNext',
		}),
	],
});
