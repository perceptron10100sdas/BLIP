
import React from 'react'
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import News from './News'
import TradingViewWidget from './Tradingview';
import SpotifyPlaylist from './Spotify';
import { getAuth } from 'firebase/auth';
import { listAll } from 'firebase/storage';



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
    <div className="text-white space-y-3 bg-inherit rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-white text-xl px-4 overline">Whats happening</h4>
        <TradingViewWidget/>
        {newsResults.slice(0, articleNum).map((article) => (
          <News key={article.title} article={article} />
        ))}
        <button onClick={()=>setArticleNum(articleNum + 3)}  className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          Show more
        </button>
      </div>
     
      <h2 className='text-green-500 overline'>Trending on Spotify</h2>
      <SpotifyPlaylist/>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {randomUsersResults.slice(0, randomUserNum).map((randomUser) => (
          <div
            key={randomUser.login.username}
            className="flex items-center px-4 py-2  cursor-pointer hover:bg-gray-200"
          >
            <img
              className="rounded-full"
              width="40"
              src={randomUser.picture.thumbnail}
              alt=""
            />
            <div className="truncate ml-4 leading-5">
              <h4 className="font-bold hover:underline text-[14px] truncate">
                {randomUser.login.username}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {randomUser.name.first + " " + randomUser.name.last}
              </h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
              Follow
            </button>
          </div>
        ))}
        <button
          onClick={() => setRandomUserNum(randomUserNum + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>

        </div>
       
</div>
  )
}
export const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listAll(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time. 