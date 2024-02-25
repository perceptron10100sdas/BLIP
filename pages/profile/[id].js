import React from 'react'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { collection,doc, onSnapshot, orderBy,
  query } from "firebase/firestore";
import { db } from '../../firebase';
import profiles from '../../components/profiles';
import Example from '../../components/bubbletext';


export default function profile() {
  const router = useRouter();
  const { id } = router.query;
  const uid=id;
  
  
  const [profile, setProfile] = useState(null);
  console.log(uid)

  useEffect(
    () => onSnapshot(doc(db, "users", uid), async (snapshot) => setProfile(snapshot)),
    [db, uid]
  );
  

   
  return (
    <div>
    <div className="bg-[url('/sidebar.jpg')]   bg-cover bg-center h-screen  grid items-center justify-center">
     
        <div className=' flex flex-col bg-white p-4 rounded-xl bg-opacity-50 ring-2 ring-white '>
          <div className=' flex justify-end  p-3'>
            <div className='bg-white flex p-3 rounded-xl'>
          <h1 className='text-end'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div></div>
      <img src={profile?.data()?.userImg} width="200px" className=' mx-16 rounded-2xl ring-2 ring-white p-2'/>
 <h1 className='font-thin md:text-6xl text-4xl text-center mt-4'>{profile?.data()?.name}</h1>
 <h1 className='font-thin md:text-4xl sm:text-2xl text-center mt-6'>blip@{profile?.data()?.username}</h1></div></div>
 
    </div>
  )
}


