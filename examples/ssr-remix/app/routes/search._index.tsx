import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

type AskResponse = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')
  const response = await fetch(`http://jsonplaceholder.typicode.com/todos/${query}`)
  const answer: AskResponse = await response.json()

  return json({ answer, query })
}

export default function Search() {
  const { answer, query } = useLoaderData<typeof loader>()

  return (
    <section>
      <div>
        <h1>Search</h1>
        <hr />
        <form method='get'>
          <div>
            <textarea name='query' placeholder='Please enter a positive number between 1 and 200' value={query || ''} />
            <button type='submit'>Search</button>
          </div>
        </form>
        <div>{answer && <p>{answer.title}</p>}</div>
      </div>
    </section>
  )
}
