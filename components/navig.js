import React from 'react'
import { HomeIcon } from '@heroicons/react/24/outline'

import { Home } from '@mui/icons-material'
import HoverDevCards from './cards'
import { IoIosMenu } from 'react-icons/io'
import { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import Users from '../pages/people/users'




export default function Navig() {
  const [openNavigation, setOpenNavigation] = useState(false);
 
    const toggleNavigation = () => {
      if (openNavigation) {
        setOpenNavigation(false);
        
      } else {
        setOpenNavigation(true);
       
      }
    };
    console.log(openNavigation)
  return (
    <div className='z-10 '>
      <button onClick={toggleNavigation} className='fixed bottom-1   text-lime-500 brightness-150 bg-black p-3  z-20 text-3xl rounded-2xl bg-opacity-70 '  >{openNavigation ? <RxCross1/> : <IoIosMenu/>} </button>
      

      
   <div className={`${openNavigation ? "flex" : "hidden"}   bg-transparent h-screen p-3   shadow-2xl shadow-black z-10`}>

<HoverDevCards/>



        </div></div>
  
  )
}
