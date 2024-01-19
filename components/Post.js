
import {EllipsisHorizontalCircleIcon,ChatBubbleBottomCenterIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarSquareIcon} from "@heroicons/react/24/solid"
import { setDoc,doc, onSnapshot, collection ,deleteDoc } from "firebase/firestore";

import Moment from "react-moment";
import { db,storage } from "../firebase";
import { useEffect, useState } from "react";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useRouter } from "next/router";
import { userState } from "../atom/userAtom";



export default function Post({ post, id }) {
  
  const [likes, setLikes] = useState([]);
  const[hasLiked,setHasLiked]=useState(false);
  const [open, setOpen] = useRecoilState(modalState)
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const [currentUser] = useRecoilState(userState);

  useEffect(()=>{
const unsubscribe=onSnapshot(
  collection(db, "posts", id, "likes"),
  (snapshot)=>setLikes(snapshot.docs)
)
  }, [db])
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);
  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);
  async function likePost()
  {
    if (currentUser) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }
  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }
  
  return (
    <div className="flex p-3 cursor-pointer shadow-md shadow-sky-500 hover:scale-110">
      {/* user image */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={post?.data()?.userImg}
        alt="user-img"
      />
      {/* right side */}
      <div className="">
        {/* Header */}

        <div className="flex items-center justify-between ">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap shadow-md shadow-white">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline text-transparent bg-gradient-to-tr from-white to-slate-500 bg-clip-text font-sans shadow-white">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px] text-transparent bg-gradient-to-r from-yellow-500 to-white bg-clip-text">-{post?.data()?.username}@blip - </span>
            <span className="text-sm sm:text-[15px]  text-orange-400 hover:underline">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
          </div>

          {/* dot icon */}
          <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* post text */}

        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="text-white text-[15px sm:text-[16px] mb-2  text-white overline"
        >
          {post?.data()?.text}
        </p>

        {/* post image */}

        <img
          onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2"
          src={post?.data()?.image}
          width="300px"
          alt=""
        />

        {/* icons */}

        <div className=" flex justify-evenly bg-black bg-clip-padding shadow-md shadow-sky-500 text-gray-500 p-2">
        <div className="flex items-center select-none">
            <ChatBubbleBottomCenterIcon
              onClick={() => {
                if (!currentUser) {
                  router.push("/auth/signin");
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>
          {currentUser?.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
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
          <ShareIcon className="h-9 w-9  text-white hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarSquareIcon className="h-9 w-9 text-white hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
      
        </div>
      </div>
      
    </div>
  );
}