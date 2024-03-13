import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
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
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { useRouter } from "next/router";
import Example from './bubbletext'
import {motion } from "framer-motion"


export default function Sidebar() {
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
<div className="hidden xl:flex flex-col  mt-2 mb-3 items-center  fixed right-7  h-full xl:ml-24  rounded-xl ring-2 ring-slate-950 shadow-2xl shadow-slate-950 bg-slate-900   bg-cover bg-center p-5 z-20">  <div className="absolute inset-0 bg-lime-400 translate-y-[56%] ] transition-transform duration-300 rounded-3xl -z-20 brightness-125 " />  

    <div className=" ">




</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className=" mt-16 text-gray-700 space-y-7 items-center  ">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-2xl xl:mr-2 ring-2 inset-14 ring-lime-400 p-2 shadow-lg shadow-white mx-16 mt-12 "
        />
        <div className="space-y-7 mt-4">
          <h4 className=" text-4xl text-white font-sans  rounded-md p-2 ">{currentUser?.name}</h4>
          <p className=" text-slate-400 text-3xl font-thin mx-3 ">@{currentUser?.username}</p>
          
         
        </div>
        <motion.div initial={{ y:100,scale:0.55}} animate={{ y: 0,scale:1}}
    transition={{duration:3, ease:"anticipate" }} className='text-white   rounded-xl    p-3 flex justify-between '>
        <h1 className=' text-black text-xl font-sans' >Followers</h1><p className=' text-black  text-xl '>10100</p></motion.div>
        <motion.div initial={{scale:0.45}} animate={{scale:1}}
    transition={{duration:4, ease:"linear" }} className='text-white bg-black ring-1 ring-slate-700 rounded-xl    p-3 flex justify-between shadow-lg shadow-black'>
        <h1 className='ftext-black text-xl font-thin' >Following</h1><p className=' text-white'>17</p></motion.div>
        <div className='bg-white  flex p-3 rounded-xl justify-center mt-1  '>
          <h1 className='text-sky-500'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div>
      </div>
     
    </>
  ) : (
    <button
    onClick={() => router.push("/auth/signin")}
      className="bg-black text-white hover:bg-white hover:text-black  rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline mt-5"
    >
      Join Now
    </button>

  )}
  </div>
);
   

    }
