import React from 'react'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { collection,doc, onSnapshot, orderBy,
  query, 
  setDoc} from "firebase/firestore";
import { db } from '../../firebase';
import profiles from '../../components/profiles';
import Example from '../../components/bubbletext';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom/userAtom';
import {motion} from "framer-motion"

export default function profile() {
  const router = useRouter();
 
  const {id}=router.query

  
  const [currentUser]=useRecoilState(userState);
  
  
  const [profile, setProfile] = useState();
 

  useEffect(
    () => onSnapshot(doc(db, "users", id), (snapshot) => setProfile(snapshot)),
    [db, id]
  );
  
   
  return (
    <div>
    <div className="bg-black bg-cover bg-center h-full p-10  grid items-center justify-center">
     
        <motion.div initial={{ rotateY:180,rotateX:180}} animate={{ rotateY: 0,rotateX:0}}
    transition={{duration:3, ease:"anticipate" }}    className=' flex flex-col bg-white p-4 rounded-xl  ring-1 ring-slate-200 shadow-lg  shadow-slate-200  sm:w-[550px] md:h-[350px] max-w-screen-sm mb-20 z-20 relative overflow-hidden'> <div className="absolute inset-0 bg-lime-400 translate-y-[70%] rounded-full  transition-transform duration-300 brightness-125" />
          <div className=' flex justify-end  p-3'>
            <div className='bg-lime-300 flex p-3 rounded-xl'>
            <h1 className='text-end'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div></div>
      {/*<img src="/logo.jpg" width="200px" className=' mx-16 rounded-2xl ring-2 ring-white p-2'/> */}
      
 <h1 className='font-sans text-black text-2xl md:text-6xl mt-6'>{profile?.data()?.name}</h1>
 <h1 className='font-thin md:text-4xl sm:text-2xl  mt-6 text-slate-500 '>@{profile?.data()?.username}</h1>
 <div className='flex justify-evenly'>
 <h1 className='   mt-6  flex md:text-xl  p-3 text-black z-10 '>Followers<p className='mx-2'>10100</p></h1>
 <h1 className='   mt-6   md:text-xl  p-3 text-black  z-10   flex '>Following<p className='mx-2'>17</p></h1></div>
 </motion.div>
 <motion.div initial={{ y:100,opacity:0}} animate={{ y: 0,opacity:1}}
    transition={{duration:5, ease:"anticipate" }} className='grid justify-center bg-slate-900 rounded-2xl bg-opacity-50 brightness-125 ring-1 ring-black p-3 mt-3'>
 <img src={profile?.data()?.userImg} width="200" height="200" className=' rounded-full mt-7 ring-2 ring-white  relative bottom-20  items-center left-8'/>
 <div className=' grid justify-center'><p className='text-slate-100'>Start Following @{profile?.data()?.name} on BLIP</p> <button onClick=""  className=' text-2xl rounded-2xl bg-lime-500 brightness-125 text-black font-sans p-2  mt-6'> Follow
  </button></div>
 
</motion.div></div>
 
    </div>
  )
}

