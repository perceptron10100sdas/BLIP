import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function youtube() {
 
  
  const [data, setData] = useState([])
  
 
   
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(
        'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyCBvPC0zInPyUvfrp0TWUvlWDQ9vc52i8o'
      );
      setData(results.data.items) 
      console.log(results.data.items);
    }
    fetchData();
  }, [data])

  return (
    <div className="">
      
       
        
          {data && data.map(data => {
           
                    <h1 className='text-blue-950'>
                      {data.title}
                    </h1>
                 
          })}
       
    </div>
  )
}


