import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Camera, X } from 'lucide-react'
import Profile from "../assets/images/profile.jpg"

const Account = ({ openModal, setOpenModal }) => {

  const userData = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : null

  const [isClosing,setIsClosing] = useState(false)
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')

  const closeForm = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setOpenModal(false)
    }, 200)
  }

  useEffect(()=>{
    setFirstName(userData.firstName)
    setLastName(userData.lastName)
  },[])



  return (
    <AnimatePresence>
      {openModal && !isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
        >
          <motion.form onSubmit={(e)=>e.preventDefault()}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 0.9, opacity: 1 }} 
            exit={{ scale: 1, opacity: 0 }} 
            transition={{ duration: 0.2 }} 
            className="bg-white p-4 w-[350px] rounded-md"
           >
              <section className='flex flex-row justify-between'>
                <div className='rounded-full m-auto w-[100px] h-[100px] relative group'>
                  <img 
                    src={userData.Img ? userData.Img : Profile} alt='profile here' 
                    className='w-full h-full bg-contain rounded-full relative border border-slate-400'
                  />
                  <span className='absolute inset-0 bg-black/40 flex justify-center items-center 
                    rounded-full opacity-0 group-hover:opacity-100 group-hover:cursor-pointer'
                  >
                    <Camera color='white' size={25}/>
                  </span>
                </div>
    
                <div className='hover:cursor-pointer' onClick={()=>closeForm()}>
                  <X/>
                </div>
              </section>
    
              <form className='w-[98%]' onSubmit={(e)=>e.preventDefault()}>
                <div>
                  <label>First Name</label>
                  <input type='text' 
                    className='w-full py-2 pl-2 border border-slate-500 rounded-md' 
                    autoComplete='off' 
                    readOnly
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </div>
        
                <div className='mt-2'>
                  <label>Last Name</label>
                  <input type='text' 
                    className='w-full py-2 pl-2 border border-slate-500 rounded-md' 
                    autoComplete='off'
                    readOnly
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>

                <div className='mt-2'>
                  <label>Email</label>
                  <input type='text' 
                    className='w-full py-2 pl-2 border border-slate-500 rounded-md outline-none' 
                    readOnly
                    value={userData.email}
                  />
                </div>

                <div className='mt-2'>
                  <label>Account Created On:</label>
                  <input type='text' 
                    className='w-full py-2 pl-2 border border-slate-500 rounded-md outline-none' 
                    readOnly
                    value={userData.createdAt}
                  />
                </div>

                <button className='bg-black w-full rounded-[5px] text-white py-2 mt-5 text-md'>
                  Edit
                </button>
                <button className='mt-2 bg-red-800 w-full rounded-[5px] text-white py-2 text-md hover:bg-transparent 
                  hover:border hover:border-red-500 hover:text-red-800 hover:font-semibold'
                >
                  Delete Account
                </button>
              </form>
            </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Account
