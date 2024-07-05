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
import { query,orderBy } from 'firebase/firestore'
import User from '../pages/people/user'

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc,onSnapshot,collection } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { useRouter } from "next/router";
import Example from './bubbletext'
import {motion } from "framer-motion"
import { useState } from 'react'
import Users from '../pages/people/users'



export default function Sidebar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);

  const[users,setUsers]=useState([])
 
 
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
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setUsers(snapshot.docs);
        }
      ),
    []
  );
 
  return (
<div className="hidden xl:flex flex-col  mt-2 mb-3 items-center   right-7  h-screen xl:ml-24  rounded-xl ring-2 ring-slate-950 shadow-2xl shadow-slate-950 bg-slate-900   bg-cover bg-center p-5 z-20">  

    <div className=" ">




</div>
{currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className=" mt-16 text-gray-700 space-y-7 items-center   ">
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
