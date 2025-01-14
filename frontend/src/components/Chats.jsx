import React, { useContext, useEffect, useState } from 'react'
import { ChatStore } from '../store/ChatStoreProvider'
import { Auth } from '../store/AuthStore'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Chats = () => {
  const {setCurrentChatUser}=useContext(ChatStore)
  const {currentUser} =useContext(Auth);
  const navigate=useNavigate();
  if(!currentUser){
    navigate("/login");
  }
    const [friends,setFriends]=useState([])
    useEffect(() => {
      const fetchFriendDetails = async () => {
        if (currentUser && currentUser.friends) {
          const details = [];
          for (const friendId of currentUser.friends) {
            try {
              const response = await axios.post(`http://localhost:8080/api/user/profile/${friendId}`);
              details.push(response.data.user);
            } catch (err) {
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
          setFriends(details);
        }
      };
  
      fetchFriendDetails();
    }, [currentUser]);
  return (
    <>
     <div className='border border-gray-500 h-[90vh] w-full'>
      <p className='text-center text-white font-semibold p-2 tracking-widest border-b text-xl h-[8vh]'>Chats</p>
      <div className='flex flex-col mt-3 gap-2 overflow-y-scroll h-[80vh]'>
        {friends &&
            friends.map((friend)=>{
                return <div className='p-2 bg-gray-600 mx-2 rounded-md flex flex-col cursor-pointer' onClick={()=>{
              setCurrentChatUser(friend)
            }}>
            <p className='font-bold text-violet-200'>{friend.userName}</p>
            <div className='flex justify-between '>
            <p className='font-normal text-gray-400'>Hello</p>
            <p className='font-extralight text-gray-200'>12:10</p>
            </div>
        </div> 
            })
        }
      </div>
    </div>
    </>
  )
}

export default Chats
