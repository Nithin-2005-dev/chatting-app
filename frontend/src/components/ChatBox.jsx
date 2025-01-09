import React from 'react'

const ChatBox = () => {
  return (
    <div className='w-[50vw] flex flex-col'>
    <div className='bg-gray-600 p-2 text-white flex gap-3 h-[9vh] border-b'>
    <img src="/user.png" alt="" width={30} className='rounded-full'/>
    <div >User</div>
    </div>
    <div className='h-full overflow-y-scroll flex flex-col'>
        {
            [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,0,].map((e)=>{
                return <div className={`bg-gray-300  m-2 w-fit p-1 ${e%2==0?'':'self-end'} rounded-lg rounded-br-none`}>
                <p className='pr-10'>message {e}</p>
                <p className='text-xs text-right'>10:20</p>
                </div>
            })
        }
    </div>
    <div className='flex items-center'>
    <input type="text" placeholder='Enter your message' className='p-1 m-1 rounded-md w-full'/>
    <button className='p-1 px-2 text-white font-bold cursor-pointer bg-green-400 m-1 rounded-lg'>Send</button>
    </div>
    </div>
  )
}

export default ChatBox
