import React from "react";
import { FiAlertTriangle, FiCreditCard, FiHash, FiMail, FiMessageSquare, FiUser, FiUsers } from "react-icons/fi";
import { FiHome } from "react-icons/fi";
import { IoIosGitNetwork } from "react-icons/io";
import {motion} from "framer-motion"

const HoverDevCards = () => {
  return (
    <div className="p-4">
      <p className="text-2xl font-semibold mb-2 text-sky-800">Routes</p>
      <div className="">
        <Card
          title="Home"
          subtitle="127.0.0.1:5500"
          href="/"
          Icon={FiHome}
        />
        <Card title="Blip@Trending" subtitle="Explore what's hot now" href="/explore/explore" Icon={FiHash} />
        <Card
          title="Blip@MySpaces"
          subtitle="Your Space, Your Rules."
          href="#"

Icon={IoIosGitNetwork}
        />
        <Card title="@Blippers" subtitle="Follow other BLippers" href="/people/users" Icon={FiUsers} />
       
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <motion.a
      href={href}
      className="w-full p-5  rounded-2xl border-slate-300 relative overflow-hidden group bg-black flex mt-5 space-x-3 ring-2 ring-black shadow-2xl shadow-black"
      initial={{ x:-100}} animate={{ x: 0}}
      transition={{duration:3, ease:"anticipate" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black to-slate-600 translate-x-[100%] group-hover:translate-x-[0%] transition-transform duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-pink-200 group-hover:text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-sky-500 group-hover:text-white transition-colors relative z-10 duration-300" />
      <div>
      <h3 className=" text-xl text-white font-thin group-hover:text-pink-500 relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-transparent group-hover:text-violet-200 relative z-10 duration-300">
        {subtitle}
      </p></div>
    </motion.a>
  );
};

export default HoverDevCards;