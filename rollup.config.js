import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; // 引入 terser 插件

export default defineConfig({
	input: './src/webvital/baseTrace.ts',
	output: {
		name: 'Perf',
		file: './dist/webvital/baseTrace.js',
		format: 'umd',
		plugins: [terser()], 
	},
	plugins: [
		resolve(), 
		commonjs(),
		typescript({
			declaration: true,
			declarationDir: './dist/webvital',
			rootDir: 'src',
		}),
	],

});
