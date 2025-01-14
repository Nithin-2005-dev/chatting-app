import React from 'react'
import Options from '../components/Options'
import AddFriend from '../components/AddFriend'
import ChatBox from '../components/ChatBox'
import { ChatStoreProvider } from '../store/ChatStoreProvider'
import Header from '../components/Header'
const AddFriendPage = () => {
  return (
    <ChatStoreProvider>
    <div className='h-[100vh] flex flex-col'>
      <Header></Header>
      <div className='h-[90vh] flex'>
      <div className='flex w-[50vw]'>
      <Options/>
      <AddFriend/>
      </div>
      <div className='flex w-[50vw]'>
      <ChatBox/>
      </div>
      </div>
    </div>
    </ChatStoreProvider>
  )
}

export default AddFriendPage
