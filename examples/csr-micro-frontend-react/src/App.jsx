import * as React from 'react'

import './App.css'

/** @type {(context: any) => React.ReactElement} */
const App = (context) => (
  <section className='app-a'>
    <h3>App {context?.TITLE ?? 'default'}</h3>
  </section>
)

export default App
