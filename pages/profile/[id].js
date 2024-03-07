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
 {/* const router = useRouter();
  const { uid } = router.query;
 console.log(uid)
  
  const [currentUser]=useRecoilState(userState);
  
  
  const [profile, setProfile] = useState(null);
 

  useEffect(
    () => onSnapshot(doc(db, "users", uid), (snapshot) => setProfile(snapshot)),
    [db, uid]
  );
  */}
   
  return (
    <div>
    <div className="bg-gradient-to-b from-indigo-800  to-rose-500  bg-cover bg-center h-full p-10  grid items-center justify-center">
     
        <motion.div initial={{ rotateY:180,rotateX:180}} animate={{ rotateY: 0,rotateX:0}}
    transition={{duration:3, ease:"anticipate" }}    className=' flex flex-col bg-gradient-to-bl from-indigo-800 via-black to-rose-500 p-4 rounded-xl bg-opacity-40 ring-1 ring-black shadow-lg shadow-black md:w-[550px] md:h-[350px] max-w-screen-sm mb-20'>
          <div className=' flex justify-end  p-3'>
            <div className='bg-white flex p-3 rounded-xl'>
          <h1 className='text-end'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div></div>
      {/*<img src="/logo.jpg" width="200px" className=' mx-16 rounded-2xl ring-2 ring-white p-2'/> */}
      
 <h1 className='font-thin text-white text-2xl md:text-6xl mt-6'>Sambhav Das</h1>
 <h1 className='font-thin md:text-4xl sm:text-2xl  mt-6 text-orange-500'>@ceosambhavdas17</h1>
 <div className='flex justify-evenly'>
 <h1 className='   mt-6  bg-indigo-700 md:text-xl  p-3 text-orange-600  z-10 rounded-2xl bg-opacity-70 flex ring-1 ring-orange-700'>Followers<p className='mx-2'>10100</p></h1>
 <h1 className='   mt-6  bg-orange-700 md:text-xl  p-3 text-indigo-600  z-10 rounded-2xl bg-opacity-90 flex ring-1 ring-indigo-700'>Following<p className='mx-2'>17</p></h1></div>
 </motion.div>
 <motion.div initial={{ y:100,opacity:0}} animate={{ y: 0,opacity:1}}
    transition={{duration:5, ease:"anticipate" }} className='grid justify-center bg-white rounded-2xl bg-opacity-40 brightness-125 ring-1 ring-black p-3 mt-3'>
 <img src='/logo.jpg' width="200" height="200" className=' rounded-full mt-7 ring-2 ring-sky-500  relative bottom-20  items-center left-8'/>
 <div className=' grid justify-center'><p>Start Following @SambhavDas on BLIP</p> <button onClick=""  className=' text-2xl rounded-2xl bg-blue-500 text-white font-thin ring-2 p-2 ring-pink-500 mt-6'> Follow
  </button></div>
 
</motion.div></div>
 
    </div>
  )
}

