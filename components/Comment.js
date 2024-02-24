import {EllipsisHorizontalCircleIcon,ChatBubbleBottomCenterIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarSquareIcon} from "@heroicons/react/24/solid"
  import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
  import Moment from "react-moment";
  import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { db, storage } from "../firebase";
  
  import { useState, useEffect } from "react";
  import { deleteObject, ref } from "firebase/storage";
  import { useRecoilState } from "recoil";
  import { modalState, postIdState } from "../atom/modalAtom";
  import { useRouter } from "next/router";
  import { userState } from "../atom/userAtom";
  
  export default function Comment({ comment, commentId, originalPostId }) {
   
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [currentUser] = useRecoilState(userState);
    const router = useRouter();
  
    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "posts", originalPostId, "comments", commentId, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
    }, [db, originalPostId, commentId]);
  
    useEffect(() => {
      setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);
  
    async function likeComment() {
      if (currentUser) {
        if (hasLiked) {
          await deleteDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              currentUser?.uid
            )
          );
        } else {
          await setDoc(
            doc(
              db,
              "posts",
              originalPostId,
              "comments",
              commentId,
              "likes",
              currentUser?.uid
            ),
            {
              username: currentUser?.username,
            }
          );
        }
      } else {
        router.push("/auth/signin");
      }
    }
  
    async function deleteComment() {
      if (window.confirm("Are you sure you want to delete this comment?")) {
        deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
      }
    }
  
    return (
      <div className="flex  rounded-md ring-2 ring-purple-400 mt-3 p-3 bg-[url('/sidebar.jpg')] bg-cover bg-center bg-opacity-20">
        {/* user image */}

        <img
          className="h-11 w-11 rounded-2xl mr-4 ring-2 ring-purple-500 p-1"
          src={comment?.userImg}
          alt="user-img"
        />
        {/* right side */}
        <div className="flex-1">
          {/* Header */}
  <div className="bg-white rounded-md bg-opacity-50 ring-2 ring-pink-400 p-3">
          <div className="flex items-center justify-between  ">
            {/* post user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap ">
              
              <span className="text-sm sm:text-[15px]  text-white">
                @{comment?.username} commented-
              </span>
             
            </div>
  
            {/* dot icon */}
            
          </div>
  
          {/* post text */}
  
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2  text-black">
           "{comment?.comment}" 
          </p>
  
          {/* icons */}
  
          <div className="flex justify-between text-gray-500 p-2">
            <div className="flex items-center select-none">
              <ChatBubbleBottomCenterIcon
                onClick={() => {
                  if (!currentUser) {
                    // signIn();
                    router.push("/auth/signin");
                  } else {
                    setPostId(originalPostId);
                    setOpen(!open);
                  }
                }}
                className="h-9 w-9 hoverEffect p-2 text-sky-300 hover:text-sky-500 hover:bg-sky-100"
              />
            </div>
            <div className="flex items-center">
              {hasLiked ? (
                <HeartIconFilled
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <HeartIcon
                  onClick={likeComment}
                  className="h-9 w-9 hoverEffect p-2 text-red-400 hover:text-red-600 hover:bg-red-100"
                />
              )}
              {likes.length > 0 && (
                <span
                  className={`${hasLiked && "text-red-600"} text-sm select-none`}
                >
                  {" "}
                  {likes.length}
                </span>
              )}
            </div>
            {currentUser?.uid === comment?.userId && (
              <TrashIcon
                onClick={deleteComment}
                className="h-9 w-9 hoverEffect p-2 text-slate-400 hover:text-red-600 hover:bg-red-100"
              />
            )}
           
  
         
          </div></div>
        </div>
      </div>
    );
  }