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
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
    {/*x logo */}

    <div className="">

  <div className='flex'><h1 className='text-5xl font-bold text-white'>B</h1><p className='text-sky-500 mt-5'>reezy</p></div>
  <div className='flex'><h1 className='text-5xl font-bold text-white'>L</h1><p className='text-sky-500 mt-5'>ight</p></div>
  <div className='flex'><h1 className='text-5xl font-bold text-white'>I</h1><p className='text-sky-500 mt-5'>nstant</p></div>
  <div className='flex'><h1 className='text-5xl font-bold text-white'>P</h1><p className='text-sky-500 mt-5'>osting</p></div>


</div>

  

  {currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className="mt-3 text-gray-700  xl:justify-start ">
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-150 w-150 rounded-full xl:mr-2 ring-4"
        />
        <div className="leading-5 hidden xl:inline ">
          <h4 className="font-bold text-3xl text-white">{currentUser?.name}</h4>
          <p className=" text-sky-500">@{currentUser?.username}</p>
        </div>
        
      </div>
      <button className="bg-black text-white hover:bg-white hover:text-black rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline mt-3">
      Express
      </button>
    </>
  ) : (
    <button
    onClick={() => router.push("/auth/signin")}
      className="bg-black text-white hover:bg-white hover:text-black  rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
    >
      Join Now
    </button>

  )}
  </div>
);
   

    }
