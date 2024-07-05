import React from 'react'
import { db,storage } from '../../firebase'
import { useState,useEffect } from 'react'
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'
import User from './user' 
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Header from '../../components/Header'


export default function Users() {
  const[users,setUsers]=useState([])
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser)
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
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
    <div className='bg-black h-full w-[400px] p-4'>
     <Header/>
    {users.map((user) => (
        <User key={user.id} id={user.id} user={user} />
      ))}
       
    </div>
  )
}
