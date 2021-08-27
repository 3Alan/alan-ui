import typescript from '@rollup/plugin-typescript';
// 用来除了import 'xxx.scss'问题
import postcss from 'rollup-plugin-postcss';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 类似webpack-bundle-analyzer
import { visualizer } from 'rollup-plugin-visualizer';
// 不对peerDependencies打包
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

// 将package.json中的依赖打包
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      // 生成d.ts文件以及生成路径
      declaration: true,
      declarationDir: 'types'
    }),
    postcss(),
    terser(),
    visualizer()
  ]
};
