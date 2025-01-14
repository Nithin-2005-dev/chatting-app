import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatStore } from '../store/ChatStoreProvider'
import axios from 'axios';
import { Auth } from '../store/AuthStore';
import {format} from "date-fns"
import {io} from "socket.io-client"
const ChatBox = () => {
  const containerRef = useRef(null);
  const messageRef=useRef();
  const socket=io("http://localhost:8080/");
  const {currentChatUser}=useContext(ChatStore);
  const {currentUser}=useContext(Auth);
  const [messages,setMessages]=useState([])
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected")
    })
    const getAllMessages=async()=>{
      try{
        const privateKey=localStorage.getItem(`privateKey_CommuLink_${currentUser._id}`);
        const response=await axios.post(`http://localhost:8080/api/message/receive/${currentUser._id}`,{
          privateKey,
          receiver:currentChatUser._id
        })
         setMessages(response.data.allMessages);
      }catch(err){
        if (err.response) {
          console.error("Error response:", err.response.data);
          console.error("Status:", err.response.status);
        } else if (err.request) {
          console.error("No response received:", err.request);
        } else {
          console.error("Error setting up request:", err.message);
        }
      }
    }
    if(currentChatUser){
    getAllMessages();
    }
    socket.on("messageFound",async(message)=>{
      try{
      await axios.post(`http://localhost:8080/api/message/send/${currentUser._id}`,{
            receiverId:currentChatUser._id,message
          })
      getAllMessages();
        }catch(err){
          console.log(err);
        }
    })
  },[currentChatUser])
  useEffect(()=>{
    if(containerRef.current){
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },[messages])
  return (
    <div className='w-full flex flex-col'>
    {currentChatUser?<>
    <div className='bg-gray-600 p-2 text-white flex gap-3 h-[9vh] border-b'>
    <img src="/user.png" alt="" width={40} className='rounded-full px-1'/>
    <div >
    <div >{currentChatUser.userName}</div>
    <p className='text-xs text-gray-300'>{currentChatUser.isOnline?"online":"offline"}</p>
    </div>
    </div>
    <div ref={containerRef} className='h-full overflow-y-scroll flex flex-col scroll-smooth'>
        { messages &&
            messages.map((mess)=>{
                return <div className={`bg-gray-300  m-2 w-fit p-1 ${(mess.sender==currentChatUser._id)?'':'self-end'} rounded-lg rounded-br-none`}>
                <p className='pr-10'>{mess.message}</p>
                <p className='text-xs text-right'>{format(mess.time,"HH:mm")}</p>
                </div>
            })
        }
    </div>
    <div className='flex items-center'>
    <input type="text" placeholder='Enter your message' className='p-1 m-1 rounded-md w-full' ref={messageRef}/>
    <button className='p-1 px-2 text-white font-bold cursor-pointer bg-green-400 m-1 rounded-lg' onClick={()=>{
      socket.emit("newMessage",messageRef.current.value);
    }}>Send</button>
    </div>
    </>:<div className='flex flex-col text-white justify-center text-center items-center content-center h-full font-serif'>
    <p className='font-mono font-bold text-xl'>Welcome to CommuLink</p>
    <p className='text-gray-400'>Your chats are secured by</p>
    <p className='text-yellow-300 text-sm underline'>End-to-End encryption</p>
    <p className='text-xl font-bold'>Your privacy our priority</p>
    </div>}
    </div>
  )
}

export default ChatBox
