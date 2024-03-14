import React from 'react'
import { motion } from 'framer-motion'

import { Router } from 'next/router'
import { useRouter } from 'next/router'
export default function User({user,id}) {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-y-7'>
        {/*  
      */}
     
       
    <div className="flex justify-center mt-8">
      <a
      onClick={() => router.push(`/profile/${user?.data()?.uid}`)}
      className=" w-full  ring-1 ring-white relative overflow-hidden group bg-slate-200 p-7  rounded-2xl"
    >
      <div className="absolute inset-0 bg-lime-500 brightness-150 translate-y-[60%] group-hover:translate-y-[0%]  transition-transform duration-300  rounded-3xl rotate-6" />
      
      <img src={user?.data()?.userImg} width="50" height="50" className="mb-2  ring-2 ring-black group-hover:ring-white transition-colors relative z-10 duration-300 rounded-2xl" />
     
      <h3 className="   text-black group-hover:none  relative z-10 duration-300 text-center text-3xl group-hover:text-sm group-hover:text-black">
        {user?.data()?.name}
      </h3>
      <p className="text-transparent text-center group-hover:text-slate-700 relative z-10 duration-300 group-hover:white group-hover:text-4xl group-hover:mb-3 ">
      
      @{user?.data()?.username}
      </p>
      <div className='flex justify-center space-x-5 '>
      <p className="text-transparent text-center group-hover:text-white group-hover:brightness-150 bg-transparent group-hover:bg-black p-3 rounded-3xl relative z-10 duration-300 group-hover:white group-hover:text-xl group-hover:mb-3 ">
      
     Followers 10100
      </p>
      <p className="text-transparent text-center group-hover:text-lime-400 group-hover:brightness-150 bg-transparent group-hover:bg-black p-3 rounded-3xl relative z-10 duration-300 group-hover:white group-hover:text-xl group-hover:mb-3 ">
      
     Following 17
      </p></div>
      
    </a></div>
    </div>
  )
}
