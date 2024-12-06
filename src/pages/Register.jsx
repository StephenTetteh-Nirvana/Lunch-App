import { Link } from "react-router-dom"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import GlobalState from "../context/GlobalState"

const Register = () => {
  const {registerUser,errMsg} = useContext(GlobalState)

  const departments = ['Finance','Marketing','Sales']
  const navigate = useNavigate()

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [department,setDepartment] = useState('Finance')
  const [showPassword,setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)


  return (
    
    <div className="flex justify-center items-center h-screen bg-gradient-to-l from-red-500  to-green-500">
      <form className="w-96 p-6 shadow-lg bg-white rounded-md" onSubmit={(e)=>e.preventDefault()}>

        <div className="flex flex-row">
          <ChevronLeft size={30} style={{cursor:'pointer'}} onClick={()=>navigate('/')}/>
          <h1 className="text-2xl block text-center font-semibold m-auto"> Create Account</h1>
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2">First Name</label>
          <input type="text" 
            className="border w-full text text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" 
            placeholder="Enter Firstname"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2">Last Name</label>
          <input type="text"  
            className="border w-full text text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" 
            placeholder="Enter Lastname"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2">Email</label>
          <input type="text"
            className="border w-full text text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" 
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mt-3 relative">
          <label className="block text-base mb-2">Password</label>
          <input type={showPassword ? 'text' : 'password'} 
            className="border w-full text text-base px-2 py-1 relative 
            focus:outline-none focus:ring-0 focus:border-gray-600" 
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          <span className='absolute right-2 bottom-1'>
            { showPassword ?
              <EyeOff color='grey' style={{cursor:'pointer'}} onClick={()=>setShowPassword(false)}/>
              : 
              <Eye color='grey' style={{cursor:'pointer'}} onClick={()=>setShowPassword(true)}/>
            }
          </span>
        </div>

        <div className="mt-3">
          <label className="block text-base mb-2">Department</label>
          <select 
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
            value={department} 
            onChange={(e)=>setDepartment(e.target.value)}
          >
            {departments.map((item,index)=>(
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>

        {errMsg && <h3 className="text-red-700 font-semibold text-center text-lg mt-2">{errMsg}</h3>}

        <div className="mt-5">
          { !loading ? 
            <button 
              className="border-2 border-green-700 bg-green-700 text-white py-1 w-full rounded-md hover:bg-transparent 
              hover:text-green-700 font-semibold"
              onClick={()=>registerUser(email,password,firstName,lastName,department,setLoading)}
            >
              Create now
            </button>
            :
            <button
              className="flex items-center justify-center gap-2  bg-green-700 text-white py-1 w-full rounded-md
              font-semibold opacity-70 cursor-not-allowed"
            >
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account... 
            </button>
          }
        </div>

        <div className="mt-3 items-center">
          <h3 className="text-green-800 font-semibold flex flex-row">Already have an Account? 
            <Link to='/login'>
              <h3 className="text-[#2666CF] ml-1">Login</h3>
            </Link>
          </h3>
        </div>
        
      </form>
    </div>
  )
}
export default Register
