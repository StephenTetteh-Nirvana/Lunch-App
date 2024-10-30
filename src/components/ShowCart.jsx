import React, { useState } from 'react'

const ShowCart = ({setShowCart}) => {
  const [closing,setClosing] = useState(false)

  const handleClose = () =>{
    setClosing(true)

    setTimeout(() => setShowCart(false), 700)
  }
  return (
    <section className={`${closing ? 'animate-hideCart' : 'animate-showCart'} 
    bg-cartWrapper overflow-hidden fixed top-0 left-[100%] w-full min-h-screen z-50`}>
      <button onClick={()=>handleClose()} className='bg-white'>Close</button>
    </section>
  )
}

export default ShowCart