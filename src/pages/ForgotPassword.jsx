import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { useState } from "react";

const ForgotPassword = () => {
 
  const [email,setEmail] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const passwordReset = () => {
    setLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          title: "Request sent successfully",
          text: "Please check your email.",
          icon: "success"
        })
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error.code)
        Swal.fire({
          title: "Network Error",
          text: "Please check your internet connection.",
          icon: "error"
        })
      });
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-l from-red-500  to-green-500">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <div className="flex flex-row">
          <ChevronLeft size={30} style={{cursor:'pointer'}} onClick={()=>navigate(-1)}/>
          <h1 className="text-2xl block text-center font-semibold m-auto"> Forgot Password</h1>
        </div>
        <p className='text-gray-600 mt-1'>After entering a valid email below,you will be redirected to new page to set a new password.</p>
        <div className="mt-3">
          <input type="text" className="border w-full text text-base px-2 py-2 rounded-lg 
           focus:outline-none focus:ring-2 focus:border-sky-600" 
           placeholder="Enter your email"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mt-5">
          { !loading ? 
            <button className="border-2 border-green-700 bg-green-700 text-white py-2 w-full rounded-md
              hover:bg-transparent hover:text-green-700 font-semibold"
              onClick={()=>passwordReset()}
              >
              Send Request
            </button>
            :
            <button
              className="flex items-center justify-center gap-2  bg-green-700 text-white py-1 w-full rounded-md
              font-semibold opacity-70 cursor-not-allowed"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Please Wait 
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword