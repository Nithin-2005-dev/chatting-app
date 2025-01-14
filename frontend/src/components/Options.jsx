import React, { useContext, useState } from 'react'
import { IoMenu,IoChatbox } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { ChatStore } from '../store/ChatStoreProvider';
import { Link } from 'react-router';
const Options = () => {
    const [menu,showMenu]=useState(false)
  return (
    <div className='h-full flex flex-col text-sky-200 text-2xl gap-y-7 bg-gray-700 min-w-fit p-2 sticky' >
      <IoMenu onClick={()=>{
        showMenu(!menu)
      }} className='cursor-pointer'/>
      <Link to={"/"} className='flex gap-2 items-center' >
      <IoChatbox />
      {menu && <p className='text-lg' >Chats</p>}
      </Link>
      <Link to={"/addFriend"} className='flex gap-2 items-center' >
      <IoIosPersonAdd />
      {menu && <p className='text-lg' >Add friend</p>}
      </Link>
    </div>
  )
}

export default Options
