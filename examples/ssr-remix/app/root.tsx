import { LinksFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import Navbar from '../components/navbar'
import styles from './styles/shared.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export default function Root() {
  return (
    <html lang='en'>
      <head>
        <Links />
        <Meta />
      </head>
      <body>
        <Navbar />
        {/* @ts-expect-error Server Component */}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
