import React from 'react'
import Example from './bubbletext'
import Navig from './navig'
import Router, { useRouter } from 'next/router'

export default function Header() {
  const router=useRouter()
  return (
    <div className=' sticky top-0 bg-gradient-to-r from-purple-950 via-black to-rose-500  p-2   z-20   '>
      <div className='flex justify-between md:justify-center'>
     <Navig/>
      <h1 className=' text-4xl  text-center bg-black rounded-2xl p-3 mx-2 bg-opacity-40   '> <Example/></h1><button
onClick={() => router.push("/explore/smallscreen")}
className="bg-black text-indigo-500  font-thin shadow-md hover:brightness-95  rounded-full md:hidden"
>
Let's Blip
</button></div>
    </div>
  )
}
