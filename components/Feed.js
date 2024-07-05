"use client"
import React, { useState } from 'react'
import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from './Input';
import Post from './Post';
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRecoilState } from "recoil";
import { userState } from "../atom/userAtom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { motion } from 'framer-motion'

import User from '../pages/people/user'
import Example from './bubbletext';
import { DragCloseDrawerExample } from './DragDrawCloser';
import Header from './Header';

import { FiMoon, FiSun } from "react-icons/fi";
import Comment from './Comment';
const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";
export default function Feed() {
  const router=useRouter()
  const [posts,setPosts]=useState([])
  const[users,setUsers]=useState([])
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
  const auth = getAuth();

 
  const [selected, setSelected] = useState("Feed");
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
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );
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


    <div><Header/>
   
    <div className="xl:ml-[500px]  xl:min-w-[550px] sm:ml-[72px] p-1 bg-inherit grid justify-center max-w-xl">




{/* Mini-Profile */}


  
<div className='flex p-3  mt-1 bg-stone-900 bg-opacity-50 shadow-xl shadow-black ring-1 ring-black  rounded-3xl  overflow-x-scroll  scrollbar-none' >
         
         {users.map((user) => (
         <User key={user.id} id={user.id} user={user} />
       ))}
         </div>
         <div
      className={`grid h-[65px] place-content-center px-4 transition-colors ${
        selected === "F" ? "bg-white" : "bg-black"
      }`}
    >

         <SliderToggle selected={selected} setSelected={setSelected} />
         </div>
      

         
         
        {(selected=="Feed")?
        (
          
          posts.map((post) => (
          <Post key={post.id} id={post.id} post={post} />
         
        ))
        
        
        ):(<div className="grid place-content-center bg-black px-4 py-24">
          <BarLoader />
          <h1 className=' font-sans text-lg text-slate-100'>connecting
            <br/> soon..</h1>
        </div>)}


     
       
       <DragCloseDrawerExample/>
    </div></div>
  )
}

const SliderToggle = ({ selected, setSelected }) => {
  return (
    <div className="relative flex text-center  items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "Feed" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          setSelected("Feed");
        }}
      >
       
        <span className="relative z-10 text-center ">Feed</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          selected === "dark" ? "text-white" : "text-slate-100"
        }`}
        onClick={() => {
          setSelected("dark");
        }}
      >
       
        <span className="relative z-10">Inbox</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          selected === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full underline bg-red-500"
        />
      </div>
    </div>
  );
};

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "circIn",
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1"
    >
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-white" />
      <motion.div variants={variants} className="h-12 w-2 bg-red-500" />
      <motion.div variants={variants} className="h-12 w-2 bg-red-500" />
    </motion.div>
  );
};
