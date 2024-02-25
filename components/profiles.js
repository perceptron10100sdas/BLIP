import React from 'react'

export default function profiles({profile,id}) {
  return (
    <div>
      <h1>{profile?.data()?.name}</h1>
    </div>
  )
}
