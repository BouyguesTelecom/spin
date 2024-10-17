import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()

  return new Response(
    JSON.stringify({
      ...data,
    })
  )
}
