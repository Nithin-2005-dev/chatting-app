import { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode"
import axios from "axios";
export const Auth=createContext({});
export const AuthProvider=({children})=>{
  const [currentUser,setUser]=useState()
    const getUserInfo=async(user)=>{
      try{
        const response=await axios.post(`http://localhost:8080/api/user/profile/${user.id}`)
        setUser(response.data.user)
      }catch(err){
        if (err.response) {
          console.error('Error response:', err.response.data); 
          console.error('Status:', err.response.status); 
      } else if (err.request) {
          console.error('No response received:', err.request);
      } else {
          console.error('Error setting up request:', err.message);
      }
      }
    }
    const checkUser=()=>{
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
          }
          const token=getCookie('token')
          if(!token){
            return false
          }else{
            const user=(jwtDecode(token))
            return user
          }
    }
    return <Auth.Provider value={{checkUser,setUser,getUserInfo,currentUser}}>
        {children}
    </Auth.Provider>
}