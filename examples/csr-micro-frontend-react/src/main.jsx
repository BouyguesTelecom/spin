import * as React from 'react'

import { hydrateRoot } from 'react-dom/client'

import MicroFrontend from './MicroFrontend'

const container = document.getElementById('root')

if (!container) {
  throw 'Cannot attach to container'
}

hydrateRoot(
  container,
  <React.StrictMode>
    <main>
      <MicroFrontend />
    </main>
  </React.StrictMode>
)
