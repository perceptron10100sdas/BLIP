import React from 'react'

export default function User({user,id}) {
  return (
    <div>
      <h1>{user?.data()?.username}</h1>
    </div>
  )
}
