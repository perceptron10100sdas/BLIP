import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Modal from "react-modal";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  

  serverTimestamp,
} from "firebase/firestore";
import { FaceSmileIcon,PhotoIcon,XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Moment from "react-moment";
import { userState } from "../atom/userAtom";
import Example from "./bubbletext";
export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const [currentUser] = useRecoilState(userState);
 
  const router = useRouter();
  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot);
    });
  }, [postId, db]);

  async function sendComment() {
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment: input,
      name: currentUser.name,
      username: currentUser.username,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      userId: currentUser.uid,
    });

    setOpen(false);
    setInput("");
    router.push(`posts/${postId}`);
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-gradient-to-t from-blue-950 to-pink-500 opacity-90 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <XMarkIcon className="h-[23px] text-gray-700 p-0" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.data()?.userImg}
                alt="user-img"
              />
              
              <span className="text-sm sm:text-[15px]">
                @{post?.data()?.username} -{" "}
              </span>
          
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.data()?.text}
            </p>

            <div className="flex  p-3 space-x-3">
              <img
                src={currentUser.userImg}
                alt="user-img"
                className="h-11 w-11  cursor-pointer hover:brightness-95 rounded-2xl ring-2 ring-purple-500 p-1 "
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Comments..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      // onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-black hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-black hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!input.trim()}
                    className="bg-black hover:bg-white text-white hover:text-black px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    <Example/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}