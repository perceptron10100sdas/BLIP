import React from 'react'
import {
    FaceSmileIcon,
    PhotoIcon,
    XMarkIcon,
  } from "@heroicons/react/24/solid";
  import { useRecoilState } from "recoil";
  import { userState } from "../atom/userAtom";
  import { signOut, getAuth } from "firebase/auth";
  import { useState,useRef } from 'react';
  import {db,storage} from "./../firebase"

import { addDoc, collection, serverTimestamp,updateDoc,doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import motion from "framer-motion"


export default function Input() {
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const auth = getAuth();
  
  const[input,setInput]=useState("")
  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
   
    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      text: input,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      name: currentUser.name,
      username: currentUser.username,

    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  return (
<>
    {currentUser && (
      <div className="flex    rounded-2xl p-4 mt-2 space-x-3   bg-slate-700  bg-opacity-50  ">
        <img
         onClick={onSignOut}
         src={currentUser?.userImg}
          alt="user-img"
          className="h-11 w-11 rounded-xl p-1 ring-1 ring-black cursor-pointer hover:brightness-95"
        />
        <div className="w-full ">
          <div className="">
          <textarea
                className="w-full border-none focus:ring-0 text-lg  placeholder:text-white placeholder-font-thin tracking-wide min-h-[50px] text-white bg-inherit"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
          </div>
          {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="h-7 text-black absolute cursor-pointer shadow-md shadow-white rounded-full"
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
         <hr/>
            <div className="flex items-center justify-between pt-2.5 ">
          
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-white rounded-2xl bg-red-500 ring-1  ring-red-500 shadow-sm shadow-black hover:bg-purple-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                  
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-xl font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Blip
                  </button>
                </>
              )}
            </div>
          </div>
      </div>
    )}
  
  </>
  );
}

