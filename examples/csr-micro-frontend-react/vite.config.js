import { resolve } from 'path'

import react from '@vitejs/plugin-react'

/** @type {() => import('vite').UserConfig} */
export default () => ({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/MicroFrontend.jsx'),
      preserveEntrySignatures: 'exports-only',
      // external: ['react', 'react-dom'],
      output: {
        entryFileNames: 'mfe.[hash].[format].js',
        assetFileNames: 'mfe.[hash].[ext]',
        format: 'es',
      },
    },
  },
})
