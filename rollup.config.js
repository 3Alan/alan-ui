import typescript from '@rollup/plugin-typescript';
// 用来处理import 'xxx.scss'问题
import postcss from 'rollup-plugin-postcss';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 类似webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// 拷贝静态资源
import copy from 'rollup-plugin-copy';

// 将package.json中的依赖打包
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const copyRight = `/*!
Copyright (c) 2021 3Alan.
Licensed under the MIT License (MIT)
*/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      footer: copyRight
    },
    {
      file: pkg.module,
      format: 'esm',
      footer: copyRight
    }
  ],
  plugins: [
    // 由于roughjs只有es模块
    resolve({ resolveOnly: ['roughjs'] }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      // 生成d.ts文件以及生成路径
      declaration: true,
      declarationDir: 'types'
    }),
    copy({
      targets: [{ src: 'src/components/style/*.ttf', dest: 'dist' }]
    }),
    postcss(),
    terser(),
    visualizer()
  ]
};
