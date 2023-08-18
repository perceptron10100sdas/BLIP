import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
import {HomeIcon} from "@heroicons/react/24/solid"
import {HashtagIcon} from "@heroicons/react/24/outline"


export default function Sidebar() {
  return (
    <div className='"hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24"'>
        {/*x logo */}

    <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
        <Image 
         width="50"
         height="50"
        src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202307/x_twitter-sixteen_nine.jpg"/>

    
    </div>
    <div>
      <SidebarMenuItem title="Home" Icon={HomeIcon}/>
    </div>
    

      
    </div>
  )
}
