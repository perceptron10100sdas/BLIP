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
import Users from './Users';



import Example from './bubbletext';

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
    <div className="xl:ml-[500px]  xl:min-w-[550px] sm:ml-[72px] p-3 bg-inherit flex-grow max-w-xl">
    <div className="flex justify-evenly py-2 px-3 sticky top-0 z-50 bg-black rounded-md ring-1 ring-blue-950 p-3 ">
      <div className='flex justify-around space-x-10'>
      <Example/></div>
      <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">




{/* Mini-Profile */}


  

<button
onClick={() => router.push("/explore/smallscreen")}
className="bg-black text-indigo-500  font-thin shadow-md hover:brightness-95 md:hidden"
>
Let's Blip
</button></div></div>


<Input/>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
       
      
    </div>
  )
}

