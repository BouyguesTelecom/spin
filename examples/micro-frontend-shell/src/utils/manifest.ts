import type { Config, Manifest, MFEManifest } from '../types'
import { asset, css, js } from './entrypoints'
import { camelize } from './string'

const fetchManifest = async (url: string): Promise<MFEManifest> => await (await fetch(`${url}/manifest.json`)).json()

/**
 * Extract the configuration from the environment variables.
 *
 * @returns Object representing the configuration set in env variables
 */
const extractConfig = (env: typeof process.env) =>
  Object.fromEntries(
    Object.keys(env)
      .filter((key) => key.startsWith('SPIN_CONFIG_'))
      .map((key) => [camelize(key.replace(/^SPIN_CONFIG_/, '')), env[key]])
  )

/**
 * Extract the Micro-Frontend references from the environment variables.
 *
 * @returns Object representing the Micro-frontends set in the env variables.
 */
const extractMFEs = (env: typeof process.env): Record<string, { origin: string; config?: object }> =>
  Object.fromEntries(
    Object.keys(env)
      .sort()
      .filter((name) => name.startsWith('SPIN_MFE_') && !name.endsWith('_CONFIG'))
      .map((name) => [name, { origin: String(env[name]), config: JSON.parse(env[`${name}_CONFIG`] ?? '{}') }])
  )

export const buildManifest: () => Promise<Manifest> = async () => {
  const envConfig = extractConfig(process.env)

  const mfeRefs = extractMFEs(process.env)

  const mfeManifests = await Promise.all(
    Object.values(mfeRefs).map(
      ({ origin, config }) =>
        new Promise<[string, MFEManifest, Config | undefined]>(async (resolve) => {
          resolve([origin, await fetchManifest(origin), config])
        })
    )
  )

  return {
    config: {
      // default config
      debug: false,
      metaLang: 'en',
      metaCharset: 'UTF-8',
      metaViewport: 'width=device-width, initial-scale=1.0',
      metaFavicon: '꩜',
      metaTitle: 'Default title',
      // env var config substitution
      ...envConfig,
    },

    /** Micro-frontends */
    mfes: mfeManifests.map(([origin, manifest, config]) => ({
      url: `${origin}/${manifest[js][asset]}`,
      css: `${origin}/${manifest[css][asset]}`,
      config,
      _config: manifest._config,
    })),
  } as Manifest
}
