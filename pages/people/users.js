import React from 'react'
import { db,storage } from '../../firebase'
import { useState,useEffect } from 'react'
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'
import User from './user' 
import { useRecoilState } from 'recoil'
import { userState } from '../../atom/userAtom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Example from '../../components/bubbletext'


export default function users() {
  const[users,setUsers]=useState([])
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
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
    <div className='bg-black h-full p-4'>
      <div className='flex justify-center '>
     <Example/>
          <h1 className='font-thin text-pink-500 p-2 rounded-2xl  italic bg-white text-2xl'>@users</h1></div>
    {users.map((user) => (
        <User key={user.id} id={user.id} user={user} />
      ))}
       
    </div>
  )
}
