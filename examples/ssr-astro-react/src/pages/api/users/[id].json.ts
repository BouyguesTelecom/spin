import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params: { id } }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const data = await response.json()
  return new Response(
    JSON.stringify({
      ...data,
    })
  )
}
