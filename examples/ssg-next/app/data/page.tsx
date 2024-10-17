interface dataProps {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default async function Counter() {
  const res = await fetch('http://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  const currentDate = new Date(Date.now())

  return (
    <section>
      <div>
        <h1>Some data</h1>
        <h3>Last revalidation : {currentDate.toString()}</h3>
        <hr />
        {data.map((item: dataProps) => (
          <>
            <p>{item.title}</p>
          </>
        ))}
      </div>
    </section>
  )
}
