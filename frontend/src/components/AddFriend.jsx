import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Auth } from '../store/AuthStore';
import { useNavigate } from 'react-router';

const AddFriend = () => {
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
  const {currentUser}=useContext(Auth)
  const [friend,setFriend]=useState();
  const userName=useRef();
  const handleSearch=async()=>{
    try{
      const response=await axios.post("http://localhost:8080/api/user/profile/false",{userName:userName.current.value});
      if(response.data.success){
        setFriend(response.data.user);
      }
    }catch(err){
      console.log(err);
    }
  }
  const handleAddFriend=async()=>{
    try{
        const response=await axios.put(`http://localhost:8080/api/user/addFriend/${currentUser._id}`,{friendId:friend._id})
        console.log(response);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className='border w-full'>
    <div className='flex border'>
    <input type="text" className='w-full rounded-md m-1 p-1' placeholder='Enter friend user name' ref={userName}/>
    <button className='bg-green-400 m-1 p-1 text-white font-bold rounded-md' onClick={handleSearch}>Search</button>
    </div>
    {
      friend? <div className='flex justify-between bg-gray-500 my-2 m-1 p-1 rounded-md text-white  font-bold'>
      <p>
      {friend && friend.userName}
      </p>{
        currentUser.friends.includes(friend._id) || friend._id==currentUser._id?<button className='bg-sky-300 px-2 rounded-md' >{friend._id==currentUser._id?'you': 'Already friend'}</button>:<button className='bg-orange-400 px-2 rounded-md' onClick={handleAddFriend}>Add</button>
      }
      </div>: <div className='text-gray-400  text-center mt-10 font-semibold text-sm'>
        serch friend with user name above
      </div>
    }
    </div>
  )
}

export default AddFriend
