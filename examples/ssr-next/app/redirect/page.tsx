'use client'

import { useState } from 'react'

import { redirect, useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const [searchParam, setSearchParam] = useState('')
  const router = useRouter()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchParam) return
    router.push(`/redirect/${searchParam}`)
  }
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchParam(event.target.value)
  }

  return (
    <section>
      <div>
        <h1>Redirect - SSR</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              value={searchParam}
              onChange={handleChange}
              placeholder='Please enter a positive number between 1 and 200'
            />
            <button type='submit' {...{ style: { margin: '16px' } }}>
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
