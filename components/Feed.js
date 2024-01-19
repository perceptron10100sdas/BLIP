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



import Widgets from './Widgets';

export default function Feed() {
  const router=useRouter()
  const [posts,setPosts]=useState([])
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

  
 
  return (
    <div className="xl:ml-[370px]  xl:min-w-[576px] sm:ml-[73px] bg-inherit flex-grow max-w-xl">
    <div className="flex justify-evenly py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-200 ">
      <div className='flex justify-around space-x-10'>
      <p className='text-white '>Welcome {currentUser?.name} to</p><h1 className="text-lg sm:text-xl font-semibold cursor-pointer text-white text-center">Blip</h1></div>
      <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">

      {currentUser ? (
    <>
      

      {/* Mini-Profile */}

      <div className="mt-3 text-gray-700  xl:justify-start ">
     
        <img
            onClick={onSignOut}
            src={currentUser?.userImg}
          alt="user-img"
          className="h-50 w-50 rounded-full xl:mr-2 ring-2 ring-green-500"
        />
        <div className="leading-5 hidden xl:inline ">
         
        </div>
        
      </div>
      
    </>

  ) : (
    <button
    onClick={() => router.push("/auth/signin")}
      className="bg-black text-white hover:bg-white hover:text-black  rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
    >
      Join Now
    </button>

  )}</div>
        
      </div>
      <Input/>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    
    </div>
  )
}

