import React, { useContext, useEffect } from 'react'
import Header from '../components/Header'
import { Auth } from '../store/AuthStore';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <Header></Header>
    </div>
  )
}

export default Home
