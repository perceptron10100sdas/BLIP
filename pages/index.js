import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed';
import { useState,useEffect } from 'react';


import 'tailwindcss/tailwind.css';

import CommentModal from '../components/CommentModal';
import { getAuth } from "firebase/auth";
import { listAll } from "firebase/storage";
import { db } from '../firebase';

import Users from '../components/Users';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAnimationFrame } from 'framer-motion';
import Navig from '../components/navig';
export default function Home() {
 const[users,setUsers]=useState([])
 
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
  console.log(users)

  
  return (
    <div >
      <Head>
        <title className='font-thin'>Blip</title>
        <meta name="description" content="High dopamine content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-evenly  min-h-screen max-w-screen bg-[url('/sidebar.jpg')] bg-fixed bg-center  ">
      <Navig/>
        <Feed/>
        <Sidebar/>
         
<CommentModal />
{users.map((user) => (
        <Users key={user.id} id={user.id} user={user} />
      ))}

      </main>
      

     
    </div>
  )
}


 
