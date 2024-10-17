import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

/** @type {import('rollup').RollupOptions} */
export default {
  input: './create-spin.mjs',
  output: {
    dir: 'dist',
    format: 'module',
  },
  plugins: [
    nodeResolve({
      exportConditions: ['node'],
    }),
    commonjs(),
    json()
  ],
}
