import React, { useEffect, useState } from 'react'

const Chats = () => {
    const [friends,setFriends]=useState()
    useEffect(()=>{

    },[])
  return (
    <div className='w-full border border-gray-500 h-[90vh]'>
      <p className='text-center text-white font-semibold p-2 tracking-widest border-b text-xl h-[8vh]'>Chats</p>
      <div className='flex flex-col mt-3 gap-2 overflow-y-scroll h-[80vh]'>
        {
            [1,2,3,4,5,6,7,8,10,11,12,13].map((e)=>{
                return <div className='p-2 bg-gray-600 mx-2 rounded-md flex flex-col'>
            <p className='font-bold text-violet-200'>user-{e}</p>
            <div className='flex justify-between '>
            <p className='font-normal text-gray-400'>Hello</p>
            <p className='font-extralight text-gray-200'>12:10</p>
            </div>
        </div> 
            })
        }
      </div>
    </div>
  )
}

export default Chats
