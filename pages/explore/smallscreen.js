import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './../../components/SidebarMenuItem'
import {HomeIcon} from "@heroicons/react/24/solid"
import {HashtagIcon} from "@heroicons/react/24/outline"
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  EllipsisHorizontalCircleIcon,
  
  
  InboxIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/userAtom";
import { useRouter } from "next/router";

import {motion} from "framer-motion"



export default function smallscreen() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  

  return (
    <div className='bg-gradient-to-t from-black to-slate-800'>
    <div className="grid justify-center fixed h-screen w-full  bg-gradient-to-b from-black to-slate-800 rounded-md ring-1 ring-black shadow-lg shadow-black">
    

    <div className=" ">

  <div className='text-5xl font-light text-purple-500 text-center overline mt-4 '>BLIP</div>
  


</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className="mt-10 text-gray-700 space-y-7 items-center">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-2xl xl:mr-2 ring-4 ring-sky-500 shadow-lg shadow-sky-500 mx-12 mt-12"
        />
        <div className="space-y-7 mt-4">
          <h4 className=" text-4xl text-sky-500 font-thin ">{currentUser?.name}</h4>
          <p className=" text-white text-3xl font-thin">@{currentUser?.username}</p>
          
         
        </div>
        
      </div>
    <div className=' flex flex-col space-y-5'>
      <motion.div initial={{ y:100,scale:0.55}} animate={{ y: 0,scale:1}}
    transition={{duration:3, ease:"anticipate" }} className='text-white bg-gradient-to-r from-black to-blue-950 ring-1 ring-slate-700 rounded-xl    p-2 flex justify-between shadow-lg shadow-black'>
        <h1 className='font-thin text-sky-500 ' >Followers</h1><p className=' text-pink-500'>10100</p></motion.div>
        <motion.div initial={{scale:0.45}} animate={{scale:1}}
    transition={{duration:4, ease:"linear" }} className='text-white bg-gradient-to-l from-black to-blue-950 ring-1 ring-slate-700 rounded-xl    p-2 flex justify-between shadow-lg shadow-black'>
        <h1 className='font-thin text-pink-500' >Following</h1><p className=' text-sky-500'>17</p></motion.div>
        <div className='bg-white bg-opacity-25 flex p-3 rounded-xl justify-center mt-1  '>
          <h1 className='text-sky-500'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div></div>
    </>
  ) : (
    <button
    onClick={() => router.push("/auth/signin")}
      className="bg-pink-600 text-white hover:bg-white hover:text-black  rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg  mt-5"
    >
      Join Now
    </button>

  )}
  </div></div>
);
   

    }
