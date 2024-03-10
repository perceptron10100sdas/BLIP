import React from 'react'


export default function User({user,id}) {
    
  return (
    <div>
      <h1 className='text-slate-500'>{user?.data()?.name}</h1>
      
       
    </div>
  )
}

