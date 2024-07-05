
import {EllipsisHorizontalCircleIcon,ChatBubbleBottomCenterIcon,TrashIcon,HeartIcon,ShareIcon,ChartBarSquareIcon} from "@heroicons/react/24/solid"
import { setDoc,doc, onSnapshot, collection ,deleteDoc,addDoc,serverTimestamp } from "firebase/firestore";

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
import { MdOutlineVerified } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";




export default function Post({ post, id }) {
  
  const [likes, setLikes] = useState([]);
  const[hasLiked,setHasLiked]=useState(false);
  const [open, setOpen] = useRecoilState(modalState)
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const [currentUser] = useRecoilState(userState);
  const uid=post?.data()?.id
 
 
  const [input, setInput] = useState("");
  

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
    transition={{duration:3, ease:"anticipate" }} className="flex justify-center  w-full  relative overflow-hidden group bg-stone-900 bg-opacity-50  p-7 mt-6 mb-4  rounded-2xl shadow-2xl ring-1 ring-black shadow-black   backdrop-blur-2xl  blur-xs"> 
      {/* user image */}
      
     
      <img
        className="h-11 w-11 rounded-full  mr-4 group-hover:scale-110 ring-red-500 ring-2 shadow-xl shadow-black "
        src={post?.data()?.userImg}
        alt="user-img"
      />
      {/* right side */}
      <div className="">
        {/* Header */}

        <div className="flex items-center  justify-between ">
          {/* post user info */}
          <div className="flex justify-between  space-x-1 whitespace-nowrap ">
            <h4 className="  font-semibold  bg-transparent   relative z-10 text-white  " onClick={() => router.push(`/profile/${uid}`)}>
              {post?.data()?.name}
            </h4>
            <h4 className="  font-thin  bg-transparent   relative z-10 text-slate-300    " onClick={() => router.push(`/profile/${uid}`)}>
              
            @{post?.data()?.username}
            </h4>
            <MdOutlineVerified className=" text-red-500 mt-1" />
            
          </div>
          {currentUser?.uid === post?.data()?.id && (
            <IoIosRemoveCircleOutline
              onClick={deletePost}
              className="h-6 w-6 text-red-500 relative z-10 items-end text-end "
            />
          )}
       
      
        </div>
        {/* post text */}

       

       

        {/* post image */}

        <img
          onClick={() => router.push(`/posts/${id}`)}
          className="rounded-2xl mr-2 relative z-10 mt-3 mb-4 shadow-xl shadow-black "
          src={post?.data()?.image}
          width="300px"
          alt=""
        />
        <p
          onClick={() => router.push(`/posts/${id}`)}
          className="font-thin  text-xl  mb-2  text-white relative z-10 
          "
        >
           {post?.data()?.text}
        </p>
    

        {/* icons */}

        <div className=" flex justify-start bg-transparent bg-clip-padding  text-gray-500 p-2">
        <div className="flex   items-center select-none">
        <div className=" flex overflow-visible">
            <img src={currentUser?.userImg}
           width="30px"
           alt="" className="rounded-2xl mr-2 relative z-10 mt-3 mb-4  opacity-80 shadow-2xl shadow-black "/>
                  <input
                    className="w-full ring-1 ring-black shadow-2xl shadow-black bg-black border-none focus:ring-0 text-sm placeholder-slate-500 tracking-wide rounded-3xl h-[36px] mt-2 text-white"
                    rows="2"
                    placeholder="add a comment "
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  
                  />
                  <button  onClick={sendComment}><IoIosSend className=" text-lg mx-2 text-slate-200" /></button>
                </div>
          
          </div> 
          <div className="flex  items-center">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-9 w-9  p-2 text-red-600 hover:bg-red-100 relative z-10 group-hover:text-red-500"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-9 w-9  p-2    group-hover:bg-transparent  text-slate-300  relative z-10  "
              />
            )}
           
          </div>
         
         
      
        </div>
        {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"}  text-slate-400   text-sm select-none relative z-10`}
              >
                {" "}
                {likes.length} Likes 
              </span>
            )}
             {comments.length > 0 && (
              <span
                className={`  text-slate-400   text-sm select-none relative z-10`}
              >
                {" "}
                {comments.length} Comments
              </span>
            )}
      
    </div></motion.div>
  );
}