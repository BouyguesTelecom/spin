import React from 'react'

export default function Navbar() {
  return (
    <section>
      <nav>
        <ul>
          <li>Next SSR</li>
          <li>
            <a href={'/'}>Menu</a>
          </li>
          <li>
            <a href={'/counter'}>Counter</a>
          </li>
          <li>
            <a href={'/redirect'}>Redirect</a>
          </li>
        </ul>
      </nav>
    </section>
  )
}
