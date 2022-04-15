import typescript from '@rollup/plugin-typescript';
// 用来处理import 'xxx.scss'问题
import postcss from 'rollup-plugin-postcss';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 类似webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// 拷贝静态资源
import copy from 'rollup-plugin-copy';
import multiInput from 'rollup-plugin-multi-input';

// 将package.json中的依赖打包
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const copyRight = `/*!
Copyright (c) 2021 3Alan.
Licensed under the MIT License (MIT)
*/`;

const bundlePathMap = {
  cjs: 'dist/lib',
  es: 'dist/es'
};

// 由于 @rollup/plugin-typescript 无法处理多 output 情况，所以打包两次
const tasks = Object.keys(bundlePathMap).map((formatKey) => ({
  input: ['/**/*.{js,ts,tsx}', '!/**/**.stories.**', '!/**/__tests__/**'],
  output: [
    {
      dir: bundlePathMap[formatKey],
      format: formatKey,
      footer: copyRight
    }
  ],
  plugins: [
    // 由于roughjs只有es模块
    resolve({ resolveOnly: ['roughjs', 'path-data-parser', 'points-on-curve', 'points-on-path'] }),
    commonjs(),
    multiInput(),
    typescript({
      tsconfig: './tsconfig.build.json',
      // 生成d.ts文件以及生成路径
      declaration: true,
      declarationDir: bundlePathMap[formatKey]
    }),
    copy({
      targets: [{ src: '/style/*.ttf', dest: 'dist' }]
    }),
    postcss(),
    terser(),
    visualizer()
  ]
}));

export default tasks;
