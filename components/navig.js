import React from 'react'
import { HomeIcon } from '@heroicons/react/24/outline'

import { Home } from '@mui/icons-material'
import HoverDevCards from './cards'
import { IoIosMenu } from 'react-icons/io'
import { useState } from 'react'
import { RxCross1 } from "react-icons/rx";



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
    <div className='z-10'>
      <button onClick={toggleNavigation} className=' xl:hidden fixed text-white bg-black p-3  z-20 text-3xl rounded-2xl bg-opacity-70 '  >{openNavigation ? <RxCross1/> : <IoIosMenu/>} </button>
      

      
   <div className={`${openNavigation ? "flex" : "hidden xl:flex"}  fixed  left-3 bg-transparent h-screen p-3  ring-2 ring-blue-950 shadow-2xl shadow-black z-10`}>


<HoverDevCards/>
        </div></div>
  
  )
}
