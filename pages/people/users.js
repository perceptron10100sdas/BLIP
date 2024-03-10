import React from 'react'
import { db,storage } from '../../firebase'
import { useState,useEffect } from 'react'
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'

import User from '../../components/user'

export default function users() {
  const[users,setUsers]=useState([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "users"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setUsers(snapshot.docs);
        }
      ),
    []
  );
  return (
    <div>
    <h1>Blipp @people</h1>  
    {users.map((user) => (
        <User key={user.id} id={user.id} user={user} />
      ))}
       
    </div>
  )
}
