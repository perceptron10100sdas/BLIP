
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
import {motion} from "framer-motion"



export default function Post({ post, id }) {
  
  const [likes, setLikes] = useState([]);
  const[hasLiked,setHasLiked]=useState(false);
  const [open, setOpen] = useRecoilState(modalState)
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const [currentUser] = useRecoilState(userState);
  const uid=post?.data()?.id
  console.log(uid)

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
    
    <motion.div initial={{ y:100,scale:0.55}} animate={{ y: 0,scale:1}}
    transition={{duration:3, ease:"anticipate" }} className="flex w-full  relative overflow-hidden group bg-slate-900 p-6 mt-5 mb-4 ring-2 ring-black rounded-2xl  shadow-lg shadow-black justify-start  backdrop-blur-2xl"> <div className="absolute inset-0 bg-lime-400 translate-y-[90%] group-hover:translate-y-[18%] transition-transform duration-300 rounded-2xl brightness-125  rotate-6" />
      {/* user image */}
      <img
        className="h-11 w-11 rounded-xl p-1 mr-4 group-hover:scale-110 ring-lime-400 ring-2 shadow-md shadow-slate-500 "
        src={post?.data()?.userImg}
        alt="user-img"
      />
      {/* right side */}
      <div className="">
        {/* Header */}

        <div className="flex items-center justify-between ">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap ">
            <h4 className="  font-sans text-xl bg-transparent  hover:underline relative z-10 text-white group-hover:text-xl group-hover:overline  group-hover:text-white" onClick={() => router.push(`/profile/${uid}`)}>
              {post?.data()?.name}
            </h4>
           
            
          </div>

          
        </div>

        {/* post text */}

        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="font-thin  text-xl  mb-2  text-white relative z-10 group-hover:text-3xl group-hover:text-black
          "
        >
          {post?.data()?.text}
        </p>

        {/* post image */}

        <img
          onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2 relative z-10 "
          src={post?.data()?.image}
          width="200px"
          alt=""
        />

        {/* icons */}

        <div className=" flex justify-evenly bg-transparent bg-clip-padding  text-gray-500 p-2">
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
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100 text-transparent group-hover:text-white relative z-10"
            />
            {comments.length > 0 && (
              <span className="text-sm text-transparent group-hover:text-white relative z-10">{comments.length}</span>
            )}
          </div> <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9  p-2 text-red-600 hover:bg-red-100 relative z-10 group-hover:text-red-500"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9  p-2  text-transparent  group-hover:bg-transparent  group-hover:text-white relative z-10  "
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-black group-hover:text-white  hidden group-hover:block  text-sm select-none relative z-10`}
              >
                {" "}
                {likes.length}
              </span>
            )}
          </div>
          {currentUser?.uid === post?.data()?.id && (
            <TrashIcon
              onClick={deletePost}
              className="h-9 w-9 hoverEffect text-transparent group-hover:text-white relative z-10 p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
         
       
      
        </div>
       
      
    </div></motion.div>
  );
}