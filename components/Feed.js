import React, { useState } from 'react'
import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from './Input';
import Post from './Post';
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

import Widgets from './Widgets';

export default function Feed() {
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
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
    <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 bg-gradient-to-r from-black to-white">
      <h1 className="text-lg sm:text-xl font-semibold cursor-pointer text-white">Home</h1>
      <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">

          <SparklesIcon className="h-5"
           />
          
        </div>
        
      </div>
      <Input/>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    
    </div>
  )
}
