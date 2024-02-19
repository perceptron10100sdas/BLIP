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
    <div className=" hidden xl:flex  flex-col p-3 mt-3 mb-3 items-center fixed h-full xl:ml-24 bg-purple-500 rounded-md ring-1 ring-black shadow-lg shadow-black">
    

    <div className=" ">

  <h1 className='text-5xl font-light text-center overline '>BLIP</h1>


</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className="mt-10 text-gray-700 space-y-7 items-center">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-full xl:mr-2 ring-4 ring-black shadow-lg shadow-black mx-12 mt-12"
        />
        <div className="space-y-7 mt-4">
          <h4 className=" text-4xl text-black font-thin ">{currentUser?.name}</h4>
          <p className=" text-white text-3xl font-thin">@{currentUser?.username}</p>
          
         
        </div>
        
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
