import { ArrowLeftIcon } from "@heroicons/react/outline";
import Head from "next/head";

import Sidebar from "../../components/Sidebar";

import Post from "../../components/Post";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection,doc, onSnapshot, orderBy,
    query } from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Comment from "../../components/Comment";

import Navig from "../../components/navig";

export default function PostPage({ newsResults, randomUsersResults }) {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(
    () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
    [db, id]
  );
console.log(id)
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db, id]);
  return (
    
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen mx-auto bg-black ">
        {/* Sidebar */}
        <Navig/>
        <Sidebar />

        {/* Feed */}

        <div className="xl:ml-[370px]  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl p-2">
          <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-slate-900  rounded-xl">
            <div className=" hover:bg-white rounded-2xl p-2" onClick={() => router.push("/")}>
              <ArrowLongLeftIcon className="h-5  text-lime-600 " />
            </div>
            <h2 className="text-lg sm:text-xl text-white font-bold cursor-pointer">
             BLIP
            </h2>
            <p className="font-thin italic text-lime-300 text-xl"> @postpages</p>
          </div>

          <Post id={id} post={post}  />
          {comments.length > 0 && (
            <div className=" mt-5">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  commentId={comment.id}
                  originalPostId={id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>

        
        <CommentModal />
      </main>
    </div>
  );
}



export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());

  // Who to follow section

  const randomUsersResults = await fetch(
    "https://randomuser.me/api/?results=30&inc=name,login,picture"
  ).then((res) => res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}