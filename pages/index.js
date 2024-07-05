import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed';
import { useState,useEffect } from 'react';


import 'tailwindcss/tailwind.css';


import { getAuth } from "firebase/auth";
import { listAll } from "firebase/storage";
import { db } from '../firebase';


import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useAnimationFrame } from 'framer-motion';
import Navig from '../components/navig';
import Header from '../components/Header';
import User from './people/user';
import Users from './people/users';

export default function Home() {
  
  

  
  return (
    <div >
      <Head>
        <title className='font-thin'>Blip</title>
        <meta name="description" content="High dopamine content" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-black'>
      <main className=" flex justify-between   min-h-screen max-w-screen bg-black  bg-fixed bg-center  ">
      
        <Feed/>
      
         



      </main></div>
      

     
    </div>
  )
}


 
