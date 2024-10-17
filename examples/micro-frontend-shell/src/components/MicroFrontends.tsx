import React from 'react'

import type { Manifest } from '../types'

const MicroFrontends = ({ manifest, currentPath }: { manifest: Manifest; currentPath: string }) => {
  const mfes = Object.values(manifest.mfes)
  const activeMfes = mfes
    .filter(
      (mfe) =>
        !mfe?._config?.routes ||
        mfe?._config?.routes.length === 0 ||
        mfe?._config?.routes?.some(({ path }) => currentPath === path)
    )
    .map((mfe) => [mfe.url, React.lazy(() => import(mfe.url)), mfe.config])
  activeMfes.map((mfe) => [mfe.url, React.lazy(() => import(mfe.url)), mfe.config])
  console.log(`Loading ${activeMfes.length} out of ${mfes.length} micro-frontends`)

  return activeMfes.map(([url, Mfe, config]) => {
    if (manifest.config.debug) {
      return (
        <>
          <p>
            <mark>SSR micro-frontend</mark>{' '}
            <code>
              <a href={url} target='_blank'>
                {url}
              </a>
            </code>
          </p>

          <Mfe {...config} />
        </>
      )
    }

    return <Mfe {...config} />
  })
}

export default MicroFrontends
