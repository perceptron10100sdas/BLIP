
import React from 'react'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import News from './News'
import TradingViewWidget from './Tradingview';
import SpotifyPlaylist from './Spotify';
import { getAuth } from 'firebase/auth';
import { listAll } from 'firebase/storage';
import { FaHome } from "react-icons/fa";
import yt from './yt';

import PlaylistIframe from './youtube';



export default function Widgets({newsResults,randomUsersResults}) {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);
 
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      
    <div className="w-[90%] xl:w-[75%] sticky top-0 bg-inherit py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full bg-red-300 relative">
            <MagnifyingGlassIcon className="h-5 z-50 text-gray-500"/>
            <input className="absolute inset-0 rounded-full pl-11 border-black text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 " type="text" placeholder="Search X" />
        </div>
       
    </div>
    <FaHome className='text-white text-4xl rounded-full  p-1 ring-4 ring-purple-600 shadow-white shadow-lg'/>
    <div className="text-white space-y-3 bg-inherit rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-white text-xl px-4 overline">Whats happening</h4>
        <TradingViewWidget/>
       
      </div>
     
      <h2 className='text-green-500 overline'>Trending on Spotify</h2>
      <SpotifyPlaylist/>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        
<PlaylistIframe/>
        </div>
             
</div>
  )
}

// Start listing users from the beginning, 1000 at a time. 