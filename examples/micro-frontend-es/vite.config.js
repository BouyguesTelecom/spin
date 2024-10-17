import { resolve } from 'path'

/** @type {() => import('vite').UserConfig} */
export default () => ({
  build: {
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/MicroFrontend.jsx'),
      preserveEntrySignatures: 'exports-only',
      output: {
        entryFileNames: 'mfe.[hash].[format].js',
        assetFileNames: 'mfe.[hash].[ext]',
        format: 'es',
      },
    },
  },
})
