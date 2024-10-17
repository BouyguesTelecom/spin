export default async function Page({ params }: { params: { result: string } }) {
  const res = await fetch(`http://jsonplaceholder.typicode.com/todos/${params.result}`, { cache: 'no-store' })
  const data = (await res.json()) as { title: string }

  return (
    <section>
      <div>
        <h1>Redirect Result - SSR</h1>
        <hr />
        <div>{data.title ? <p>{data.title}</p> : <p>{params.result} not found</p>}</div>
      </div>
    </section>
  )
}
