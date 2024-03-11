import React from 'react'

export default function User({user,id}) {
  return (
    <div className='flex justify-center space-y-4 max-w-2xl'>
        {/*  
      */}
      <div className='bg-white   mt-6
       p-3 rounded-2xl ring-2 ring-black '>
        <div className='flex space-x-4 '>
        <img src={user?.data()?.userImg} width="50" height="50" className='rounded-2xl ring-2 ring-black p-1'/>
        <div className='grid '>
        <h1 className='text-black  text-3xl font-thin text-center '>{user?.data()?.name}</h1>
        <h1 className='text-slate-500 text-xl font-extralight '>{user?.data()?.username}</h1></div></div></div>
    </div>
  )
}
