import React from 'react'
import latest from './latest';

export default async function yt() {
  const response = await fetch(
   `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyCBvPC0zInPyUvfrp0TWUvlWDQ9vc52i8o`
  );

  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong");
  }

  const data = await response.json();

  const results = data.items;
  console.log(results)
  return (
    <>
<latest results={data}/>
    </>
  )
}
