import React from 'react'
import { motion } from 'framer-motion'

import { Router } from 'next/router'
import { useRouter } from 'next/router'
export default function User({user,id}) {
  const router = useRouter();
  return (
    <div className='flex flex-col gap-y-7 sm:mx-12  rounded-full p-[1.6px]   cursor-pointer hover:scale-110 transition-transform duration-200 ease-out'>
        {/*  
      */}
     
       
    <div className=" mt-4 mb-3">
      <a
      onClick={() => router.push(`/profile/${user?.data()?.uid}`)}
      className=" w-[105px]   relative overflow-hidden group    grid  justify-center"
    >
      
      
      <img src={user?.data()?.userImg} width="60px" height="60px" className="mb-2 mt-2    transition-colors  duration-300 rounded-full items-start object-fill h-[60px] ring-2 ring-red-500 " />
      <h1 className=' text-[8.8px] text-center text-white'>{user?.data()?.username}</h1>
    

    </a></div>
    </div>
  )
}
