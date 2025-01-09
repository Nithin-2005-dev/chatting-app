import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { Auth } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';
import Options from '../components/Options';
import Chats from '../components/Chats';
import ChatBox from '../components/ChatBox';

const Home = () => {
    const {checkUser,setUser,getUserInfo} =useContext(Auth);
    const navigate=useNavigate();
      useEffect(()=>{
        const user=checkUser();
        if(!user){
          navigate('/login')
        }else{
          setUser(user)
          getUserInfo();
        }
      },[])
  return (
    <div className='h-[100vh] flex flex-col'>
      <Header></Header>
      <div className='h-[90vh] flex'>
      <div className='flex w-[50vw]'>
      <Options/>
      <Chats/>
      </div>
      <ChatBox/>
      </div>
    </div>
  )
}

export default Home
