import React from 'react'
import Tradingview from '../../components/Tradingview'
import SpotifyPlaylist from '../../components/Spotify'
import News from '../../components/news1'
import { useRouter } from 'next/router'


export default function explore() {
  const router=useRouter()
  return (
    <div className='grid justify-center bg-black p-4 space-y-7 max-w-screen'>
    
       <h1 className=' text-green-500 overline font-thin text-3xl'>Top stocks</h1>
        <Tradingview/>
        <h1 className='text-green-500 overline font-thin text-3xl'>Trending on spotify</h1>
        <SpotifyPlaylist/>
        <h1 className='text-white overline font-thin text-3xl mt-5'>Latest news-</h1>
      <News/>  <button  onClick={() => router.push("/")} className='text-white font-thin italic text-xl overline '>Return Home</button>
    </div>
  )
}
