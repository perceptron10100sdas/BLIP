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
      <div className="flex  border-b border-gray-200 p-3 space-x-3">
        <img
         onClick={onSignOut}
         src={currentUser?.userImg}
          alt="user-img"
          className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="w-full divide-y divide-gray-200">
          <div className="">
          <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 bg-inherit"
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
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-black hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-black hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-black text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Express
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

