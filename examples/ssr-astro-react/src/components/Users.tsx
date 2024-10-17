import React from 'react'
import User from './User'

interface UsersProps {
  users?: undefined | {}
}

const Users = ({ users }: UsersProps): JSX.Element => {
  if (Object.keys(users).length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {Object.keys(users).map((key: string, index: number) => {
        const { name, email, username, phone, id } = users[key]
        return (
          <div key={index}>
            <User name={name} email={email} username={username} phone={phone} id={id} />
          </div>
        )
      })}
    </div>
  )
}

export default Users
