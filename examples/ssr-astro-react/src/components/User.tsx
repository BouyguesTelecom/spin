import React from 'react'

const User = ({ name, email, phone, username, id }): JSX.Element => {
  return (
    <section>
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{username}</p>
    </section>
  )
}

export default User
