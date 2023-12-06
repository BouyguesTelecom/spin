import React, { ReactNode } from 'react'

import Navbar from '../src/components/navbar'
import '.build/styles/style.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='fr'>
      <head>
        <title>SSG Next | Template SPIN</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
