import React, { useContext, useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Auth } from '../store/AuthStore';
import {Link, redirect} from "react-router-dom"
import Card from './Card';
import {useNavigate} from "react-router-dom"
const Header = () => {
  const {currentUser} =useContext(Auth)
  const [profileBlock,setProfileBlock]=useState(false)
  const navigate=useNavigate()
  const handleLogOut=()=>{
    document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login")
  }
  return (
    <header>
    <div className='flex items-center border-0 border-b-2 shadow-md content-center border-slate-500 shadow-slate-600'> 
    <img src="/logo-no-bg.png" alt="logo" width={60} className='bg-none' />
    <p className='text-white font-bold'>CommuLink</p>
    <FaUserCircle className='inline-block absolute right-3 text-4xl m-2 text-sky-400 cursor-pointer rounded-full border border-white hover:border-2 bg-white' onClick={()=>{
      setProfileBlock(!profileBlock)
    }} />
    </div>
    {profileBlock && <Card>
    <div className='m-2 mx-6 flex flex-col gap-2'>
    {currentUser && <p className='font-bold'>Hello👋 {currentUser.fullName?`${currentUser.fullName}`:`${currentUser.userName}`}</p>}
    <Link to={"/profile"} className='bg-blue-300 px-2 rounded-md text-white'>
      View Profile
    </Link>
    <button className=' bg-red-500 px-2 rounded-md text-white' onClick={handleLogOut}>Log out</button>
    </div>
    </Card>}
    </header>
  )
}

export default Header
