import React from 'react'

export default function Users({users,id}) {
  return (
    <div className='bg-inherit'>
        <div>
      <h1 className='text-white font-4xl'>{users?.data()?.name}</h1>
      </div>
    </div>
  )
}
