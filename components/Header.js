import React from 'react'

import Navig from './navig'
import Router, { useRouter } from 'next/router'
import {motion} from "framer-motion"
import { BsFillSkipForwardFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState,useEffect } from 'react';

import { query,orderBy } from 'firebase/firestore'
import { db } from "../firebase";
import { doc, getDoc,onSnapshot,collection } from "firebase/firestore";

export default function Header() {
  const [currentUser, setCurrentUser] = useRecoilState(userState);const auth = getAuth();
  
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
  const router=useRouter()
  return (
    
      <div className='xl:ml-[500px]  xl:min-w-[550px] sm:ml-[72px] p-1 bg-inherit flex-grow max-w-xl '>
       
    
      
        {!currentUser ?
  (
        <button
  onClick={() => router.push("/explore/smallscreen")}
  className="bg-black text-white  font-semibold   shadow-md hover:brightness-95  rounded-full md:hidden"
  >
  Let's Blip
  </button> ): (
<div className=' flex  justify-center'>
  <h1 className=' text-slate-300 text-start text-xl'>
   {currentUser?.name}
  </h1>
  
<img src={currentUser?.userImg}
width="30px"
alt="" className="rounded-2xl mr-2 relative z-10  mx-3 mb-4  shadow-xl opacity-90 shadow-black "/>
</div>
  )}
 
  
  
  </div>
     
  )
}
const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};