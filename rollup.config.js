import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import { name, version, main, module, browser, author } from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: './lib/index.ts',
  output: [
    {
      file: main,
      name: main,
      format: 'cjs',
      plugins: [isProduction && terser()],
    },
    {
      file: module,
      name: name,
      format: 'es',
    },
    {
      file: browser,
      name: name,
      format: 'umd',
    },
  ],
  external: ['ms'],

  plugins: [
    peerDepsExternal(),
    json(),
    resolve({
      jsnext: true,
      main: true,
    }),
    typescript({
      typescript: require('typescript'),
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: ['.js'],
      ignoreGlobal: false,
      sourceMap: false,
    }),
    license({
      banner: `
        ${name} v${version}
        Copyright ${author}
      `,
    }),
  ],
};
