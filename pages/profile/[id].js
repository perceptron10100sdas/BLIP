import React from 'react'
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import { collection,doc, onSnapshot, orderBy,
  query, 
  setDoc} from "firebase/firestore";
import { db } from '../../firebase';
import profiles from '../../components/profiles';

import { useRecoilState } from 'recoil';
import { userState } from '../../atom/userAtom';

import Post from '../../components/Post';
import Head from 'next/head'
import { IoChatboxOutline } from "react-icons/io5";
import { BsChevronBarUp } from "react-icons/bs";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiGithub, SiTiktok, SiTwitter, SiYoutube } from "react-icons/si";
export default function profile() {
 
  const router = useRouter();
 
  const {id}=router.query

  
  const [currentUser]=useRecoilState(userState);
  
  
  const [profile, setProfile] = useState();
  const [posts,setPosts]=useState();
  const[followers,setFollowers]=useState([]);
  const[hasFollowed,setHasFollowed]=useState(false);
  useEffect(()=>{
    const unsubscribe=onSnapshot(
      collection(db, "users", id , "followers"),
      (snapshot)=>setFollowers(snapshot.docs)
    )
      }, [db])
  async function follow()
  {
    if (currentUser) {
      if (hasFollowed) {
        await deleteDoc(doc(db, "users", id, "followers", currentUser?.uid));
      } else {
        await setDoc(doc(db, "users", id, "followers", currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }

  useEffect(
    () => onSnapshot(doc(db, "users", id), (snapshot) => setProfile(snapshot)),
    [db, id]
  );
  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPosts(snapshot)),
    [db, id]
  );
  console.log(posts)

  
  return (
    
    <div
  className=' z-10  h-full grid justify-center  bg-black   '>
     <Head>
        <title className='font-thin'>{profile?.data()?.name} profile</title>
       
      </Head>
 
  

 
  <div className='  bg-stone-900  backdrop-blur-2xl bg-fixed   bottom-2 rounded-3xl p-2 z-20  flex-col justify-center    '>

    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
    <Block className="col-span-12 row-span-2 md:col-span-6  bg-[image:var(--image-url)] bg-cover bg-center object-fill  h-[500px]" style={{'--image-url': `url(${profile?.data()?.userImg})`}}>
    
    <h1 className="mb-12 text-4xl font-medium leading-tight text-transparent">
      Hi, I'm Tom.{" "}
      </h1>
  </Block>
  <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-white md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <h1>{profile?.data()?.name}</h1>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-stone-800 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-xl text-white"
      >
      <h1>@{profile?.data()?.username}</h1>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-stone-800 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white "
      >
      <h1>{followers.length} Followers</h1>
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-white md:col-span-3"
    >
      <button
       onClick={follow}
        className="grid h-full place-content-center text-3xl text-black"
      >
   <h1 className='text-center'>Follow</h1>
      </button>
    </Block>
    
    </motion.div>
     
    </div>
</div>
  </div>
 
    
   
    
  
  )
}
export const RevealBento = () => {
  const router = useRouter();
 
  const {id}=router.query

  
  const [currentUser]=useRecoilState(userState);
  
  
  const [profile, setProfile] = useState();
  const [posts,setPosts]=useState();
  const[followers,setFollowers]=useState([]);
  const[hasFollowed,setHasFollowed]=useState(false);
  useEffect(()=>{
    const unsubscribe=onSnapshot(
      collection(db, "users",id, "followers"),
      (snapshot)=>setFollowers(snapshot.docs)
    )
      }, [db])
  async function follow()
  {
    if (currentUser) {
      if (hasFollowed) {
        await deleteDoc(doc(db, "users", id, "followers", currentUser?.uid));
      } else {
        await setDoc(doc(db, "users", id, "followers", currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }

  useEffect(
    () => onSnapshot(doc(db, "users", id), (snapshot) => setProfile(snapshot)),
    [db, id]
  );
  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPosts(snapshot)),
    [db, id]
  );
  console.log(posts)
  return (
    <div className="min-h-screen bg-zinc-900 px-4 py-12 text-zinc-50">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        
        <SocialsBlock />
        
        
      </motion.div>
      <Footer />
    </div>
  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src={profile?.data()?.userImg}
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      Hi, I'm Tom.{" "}
      <span className="text-zinc-400">
        I build cool websites like this one.
      </span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-1 text-red-300 hover:underline"
    >
      Contact me <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiYoutube />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiGithub />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiTiktok />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTwitter />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      My passion is building cool stuff.{" "}
      <span className="text-zinc-400">
        I build primarily with React, Tailwind CSS, and Framer Motion. I love
        this stack so much that I even built a website about it. I've made over
        a hundred videos on the subject across YouTube and TikTok.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join my mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="40"
      height="auto"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-12 fill-zinc-50"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
  );
};

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};
