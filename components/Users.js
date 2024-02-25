import React from 'react'

export default function Users({users,id}) {
  return (
    <div className='bg-black'>
      <h1 className='text-white font-4xl'>{users?.data()?.username}</h1>
    </div>
  )
}
