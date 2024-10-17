import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (path) {
    revalidatePath(path)
    const body = { revalidated: true, now: Date.now() }
    const init = { status: 200, headers: { 'content-type': 'application/json' } }
    return new Response(JSON.stringify(body), init)
  }

  const body = { revalidated: false, now: Date.now(), message: 'Missing path to revalidate' }
  const init = { status: 400, headers: { 'content-type': 'application/json' } }
  return new Response(JSON.stringify(body), init)
}
