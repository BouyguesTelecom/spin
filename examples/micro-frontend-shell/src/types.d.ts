export type MFEManifest = Record<string, any>

export type Config = Record<string, any>

export type Manifest = {
  config: {
    debug?: boolean
    metaLang?: string
    metaCharset?: 'UTF-8'
    metaViewport?: string
    metaFavicon?: string
    metaTitle?: string
    metaExtraLayout?: string
  }
  mfes: Array<{
    url: string
    css?: string
    config?: Config
  }>
}
