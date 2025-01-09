import React, { useRef } from 'react'
import { Link } from 'react-router';
import axios from "axios"
const Register = () => {
    const emailRef=useRef();
    const passwordRef=useRef();
    const userRef=useRef();
    const handleRegister=async()=>{
        try{
            const res=await axios.post("http://localhost:8080/api/auth/register",{email:emailRef.current.value,password:passwordRef.current.value,userName:userRef.current.value})
            if(res.data.success){
            navigate("/login")
            }else{
                console.error(res.data.message)
            }
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
    return (
        <div className='flex justify-center items-center flex-col gap-0 border w-screen h-screen'>
            <div>
            <p className='text-center text-blue-400 font-extrabold text-2xl tracking-widest'>CommuLink</p>
        <img src="/logo-no-bg.png" alt="" width={200}/>
            </div>
            <div className='flex flex-col gap-1 mb-3'>
        <label className='font-base text-sky-200'>User name</label>
        <input type="text" ref={userRef} className='rounded-lg p-1'/>
        </div>
        <div className='flex flex-col gap-1 mb-3'>
        <label className='font-base text-sky-200'>Email</label>
        <input type="text" ref={emailRef} className='rounded-lg p-1'/>
        </div>
        <div className='flex flex-col gap-1 mb-3'>
        <label className='font-base text-sky-200'>Password</label>
        <input type="text" ref={passwordRef} className='rounded-lg p-1'/>
        </div>
          <button onClick={handleRegister} className='bg-green-500 px-5 p-1 rounded-lg text-white font-semibold'>Register</button>
          <Link to={"/login"} className='m-2 text-white underline'>Already have an account?</Link>
        </div>
      )
}

export default Register
