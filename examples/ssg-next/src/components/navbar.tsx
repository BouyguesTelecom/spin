import React from 'react'

export default function Navbar() {
  return (
    <section>
      <nav>
        <ul>
          <li>Next SSG</li>
          <li>
            <a href={'/'}>Menu</a>
          </li>
          <li>
            <a href={'/counter'}>Counter</a>
          </li>
          <li>
            <a href={'/data'}>Data</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
