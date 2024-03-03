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
<div className="hidden xl:flex  flex-col  mt-3 mb-3 items-center fixed right-7  h-full xl:ml-24  rounded-xl ring-1 ring-white shadow-lg shadow-slate-400 bg-gradient-to-t from-black  to-slate-800   bg-cover bg-center p-5">    

    <div className=" ">

<h1 className='overline text-6xl text-sky-300'>BLIP</h1>


</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className=" mt-24 text-gray-700 space-y-7 items-center ">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-2xl xl:mr-2 ring-2 inset-14 ring-pink-500 p-2 shadow-lg shadow-white mx-12 mt-12 "
        />
        <div className="space-y-7 mt-4">
          <h4 className=" text-4xl text-sky-500   rounded-md p-2 ">{currentUser?.name}</h4>
          <p className=" text-white text-3xl font-thin mx-3 ">@{currentUser?.username}</p>
          
         
        </div>
        
        <div className='bg-white bg-opacity-25 flex p-3 rounded-xl justify-center mt-1 '>
          <h1 className='text-sky-500'>BLIP</h1>
          <h1 className='font-thin text-pink-500 italic'>@verified</h1></div>
      </div>
      <button  onClick={() => router.push("/")} className="bg-black text-white hover:bg-white hover:text-black rounded-full w-56 h-12 font-thin shadow-md hover:brightness-95 text-lg hidden xl:inline mt-7">
      Express
      </button>
      <button  onClick={() => router.push("/explore/explore")} className="bg-black text-white hover:bg-white hover:text-black rounded-full w-56 h-12 font-thin shadow-md hover:brightness-95 text-lg hidden xl:inline mt-7">
      Explore
      </button>
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
