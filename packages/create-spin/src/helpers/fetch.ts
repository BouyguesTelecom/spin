import { HttpsProxyAgent } from 'https-proxy-agent'
import isomorphicFetch from 'isomorphic-fetch'

export const fetch = (
  input: RequestInfo | URL,
  init?: (RequestInit & { agent?: any }) | undefined,
): Promise<Response> => {
  const options = { ...init }
  const proxy = globalThis.process?.env?.https_proxy

  if (proxy) {
    console.debug('setting proxy:', proxy)
    options.agent = new HttpsProxyAgent(proxy)
  }

  return isomorphicFetch(input, options)
}
