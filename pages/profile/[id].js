import React from 'react'
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export default function Profile() {
    const docRef = doc(db, "users", user.uid);
  return (
    <div>
      
    </div>
  )
}
