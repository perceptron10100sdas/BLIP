import React, { useState } from 'react'
import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from './Input';
import Post from './Post';
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/router';


import Widgets from './Widgets';

export default function Feed() {
  const router=useRouter()
  const [posts,setPosts]=useState([])
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
    <div className="flex py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-200">
      <h1 className="text-lg sm:text-xl font-semibold cursor-pointer text-white">Blip</h1>
      <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">

          <button className=" text-white"
           onClick={() => router.push("/auth/signin")}
           
           >Sign In</button>
          
        </div>
        
      </div>
      <Input/>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    
    </div>
  )
}

