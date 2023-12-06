import React from 'react'

export default function Navbar() {
  return (
    <section>
      <nav>
        <ul>
          <li>
            <b>Remix SSR</b>
          </li>
          <li>
            <a href={'/'}>Menu</a>
          </li>
          <li>
            <a href={'/counter'}>Counter</a>
          </li>
          <li>
            <a href={'/search'}>Search</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
