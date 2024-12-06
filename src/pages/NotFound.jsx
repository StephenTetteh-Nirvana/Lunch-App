import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className=' w-full h-full flex flex-col justify-center items-center'>
       <h1 className='font-bold'>404 Error</h1>
       <h3 className='text-slate-400'>Page not found</h3>
       <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate('/')}>Back to home</button>
    </div>
  )
}

export default NotFound