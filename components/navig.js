import React from 'react'
import { HomeIcon } from '@heroicons/react/24/outline'

import { Home } from '@mui/icons-material'



export default function Navig() {
  return (
   <div className='fixed  left-3 bg-slate-900 h-full p-3 bg-opacity-50'>

<h1 className='text-4xl text-sky-500 bg-gradient-to-r from-black  to-slate-800 p-4 rounded-3xl font-thin ring-2 ring-sky-400 mt-5 '>Home </h1>
<div className='mt-10'>
<h1 className='text-4xl text-pink-500 bg-gradient-to-r from-black  to-slate-800 p-4 rounded-3xl font-thin ring-2 ring-pink-400'>Blip@Trending </h1></div>

<p  className=' mt-16 animate-bounce overline text-white'>coming soon </p>
<div className='mt-6 animate-pulse duration-1000'>
<h1 className='text-4xl text-blue-500 bg-gradient-to-r from-black  to-slate-800 p-4 rounded-3xl font-thin ring-2 ring-blue-500'>MY@Spaces</h1></div>
<div className='mt-6 animate-pulse duration-1000'>
<h1 className='text-4xl text-white bg-gradient-to-r from-black  to-slate-800 p-4 rounded-3xl font-thin ring-2 ring-white'>Blip@Blippers</h1></div>

        </div>
  
  )
}
