import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed';

import 'tailwindcss/tailwind.css';
import Widgets from '../components/Widgets';
import CommentModal from '../components/CommentModal';

export default function Home({newsResults,randomUsersResults}) {
  return (
    <div >
      <Head>
        <title>Twitter clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen mx-auto bg-gradient-to-r from-white to-black">
        <Sidebar/>
        <Feed/>
        <Widgets newsResults={newsResults.articles} 
         randomUsersResults={randomUsersResults.results}
        />
<CommentModal />

      </main>
      

     
    </div>
  )
}
export async function getServerSideProps() {
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
  ).then((res) => res.json());
const randomUsersResults=await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture").then((res)=>res.json());

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}