import { createContext, useState } from "react";

export const ChatStore=createContext({});
export const ChatStoreProvider=({children})=>{
    const [currentChatUser,setCurrentChatUser]=useState(null);;
    const [lastMess,setLastMess]=useState()
    const fetchChats=()=>{
        
    }
    return <ChatStore.Provider value={{currentChatUser,setCurrentChatUser}}>
        {children}
    </ChatStore.Provider>
}