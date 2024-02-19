import React from 'react'
import Tradingview from '../../components/Tradingview'
import SpotifyPlaylist from '../../components/Spotify'

export default function explore() {
  return (
    <div className='grid justify-center bg-black p-4'>
        <Tradingview/>
        <SpotifyPlaylist/>
      
    </div>
  )
}
