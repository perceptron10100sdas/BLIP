import React from 'react'
import Example from './bubbletext'
import Navig from './navig'
import Router, { useRouter } from 'next/router'
import {motion} from "framer-motion"

export default function Header() {
  const router=useRouter()
  return (
    <div className=' sticky top-0 z-10 bg-black min-w-screen-sm '>
      <div className='flex justify-between   md:justify-center'>
     <Navig/>
      <h1 className=' text-4xl  text-center   p-3 mx-2 bg-opacity-40 relative overflow-hidden   '><motion.div initial={{ opacity:0}} animate={{ opacity: 1}}
    transition={{repeat: Infinity,duration:4, ease:"linear" }} className="absolute inset-0 bg-lime-400 translate-y-[10%]  transition-transform duration-300 rotate-45 rounded-2xl brightness-125    -z-30" /> <Example/></h1><button
onClick={() => router.push("/explore/smallscreen")}
className="bg-black text-indigo-500  font-thin shadow-md hover:brightness-95  rounded-full md:hidden"
>
Let's Blip
</button></div>
    </div>
  )
}
