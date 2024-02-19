"use client"
import React from 'react'
import Widgets from './Widgets'
import { useState,useEffect } from 'react';
import yt from './yt';
export default function latest({results }) {


  return (
    <div>
      <Widgets/>
      {results.items?.map((result) => (
   <h1 className='text-white'>{result.title}</h1>
    ))}
   </div>
  )
}
