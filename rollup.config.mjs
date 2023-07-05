import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const plugins = [
  peerDepsExternal(),
  resolve(),
  replace({
    __IS_DEV__: process.env.NODE_ENV === 'development',
    preventAssignment: true,
  }),
  commonjs(),
  terser(),
];

export default [
  {
    input: ["src/index.ts"],
    output: [
      {
        file: 'dist/index.js',
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
      {
        file: 'dist/index.cjs.js',
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.json',
      })
    ],
    external: ["react", "react-dom"],
  },
  {
    input: ["src/client/index.ts"],
    output: [
      {
        file: 'dist/client/index.js',
        format: "esm",
        sourcemap: true,
        exports: "named",
      },
      {
        file: 'dist/client/index.cjs.js',
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: [
      ...plugins,
      typescript({
        tsconfig: './tsconfig.json',
        useTsconfigDeclarationDir: true,
      })
    ],
    external: ["react", "react-dom"],
  }
];