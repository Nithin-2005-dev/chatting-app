import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { Auth } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import Options from '../components/Options';
import Chats from '../components/Chats';
import ChatBox from '../components/ChatBox';
import { ChatStoreProvider } from '../store/ChatStoreProvider';

const Home = () => {
    const {checkUser,setUser,getUserInfo} =useContext(Auth);
    const navigate=useNavigate();
      useEffect(()=>{
        const user=checkUser();
        if(!user){
          navigate('/login')
        }else{
         getUserInfo(user);
        }
      },[])
  return (
    <ChatStoreProvider>
    <div className='h-[100vh] flex flex-col'>
      <Header></Header>
      <div className='h-[90vh] flex'>
      <div className='flex w-[50vw]'>
      <Options/>
      <Chats/>
      </div>
      <div className='flex w-[50vw]'>
      <ChatBox/>
      </div>
      </div>
    </div>
    </ChatStoreProvider>
  )
}

export default Home
