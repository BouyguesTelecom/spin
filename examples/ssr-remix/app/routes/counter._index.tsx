import React, { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  const add = () => setCount((i) => i + 1)
  const subtract = () => setCount((i) => i - 1)

  return (
    <section>
      <div>
        <h1>Simple counter</h1>
        <hr />
        <div className='counter'>
          <button onClick={subtract}>-</button>
          <pre>{count}</pre>
          <button onClick={add}>+</button>
        </div>
      </div>
    </section>
  )
}
