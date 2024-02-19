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
import Example from '../../components/bubbletext'



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
    <div className='bg-black'>
    <div className="grid justify-center fixed h-screen w-full  bg-black rounded-md ring-1 ring-black shadow-lg shadow-black">
    

    <div className=" ">

  <div className='text-5xl font-light text-purple-500 text-center overline mt-4 '><Example/></div>
  


</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className="mt-10 text-gray-700 space-y-7 items-center">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-full xl:mr-2 ring-4 ring-sky-500 shadow-lg shadow-sky-500 mx-12 mt-12"
        />
        <div className="space-y-7 mt-4">
          <h4 className=" text-4xl text-sky-500 font-thin ">{currentUser?.name}</h4>
          <p className=" text-white text-3xl font-thin">@{currentUser?.username}</p>
          
         
        </div>
        
      </div>
      <button  onClick={() => router.push("/")} className="bg-pink-500 text-white hover:bg-white hover:text-black rounded-full w-56 h-12 font-thin shadow-md hover:brightness-95 text-lg  mt-7">
      Express
      </button>
      <button  onClick={() => router.push("/explore/explore")} className="bg-pink-500 text-white hover:bg-white hover:text-black rounded-full w-56 h-12 font-thin shadow-md hover:brightness-95 text-lg  mt-7">
      Explore
      </button>
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
