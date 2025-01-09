import React from 'react'
import { IoMdArrowDropup } from "react-icons/io";
const Card = ({children}) => {
  return (
    <div className='absolute right-6 justify-end flex flex-col items-end gap-0'>
<IoMdArrowDropup className='text-white text-2xl'/>
      <div className='bg-white'>
        {children}
      </div>
    </div>
  )
}

export default Card
