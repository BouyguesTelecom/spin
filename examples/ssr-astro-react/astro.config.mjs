import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  // Enable React to support React JSX components.
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    ssr: {
      noExternal: [],
    },
    build: {
      rollupOptions: {
        external: [/^sharp.*/],
      },
    },
  },
})
