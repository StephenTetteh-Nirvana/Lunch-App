import { LogOut, UserCircle2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import Swal from "sweetalert2"
import Logo from "../assets/images/freeZones.jpg"
import Account from "./Account"
import GlobalState from "../context/GlobalState"

const Navbar = () => {

  const {setAuthenticated} = useContext(GlobalState)
  const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
  const userData = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : null

  const navigate = useNavigate()
  const [openModal,setOpenModal] = useState(false)

  const logOut = async() =>{
    await signOut(auth)
    .then(()=>{
      navigate("/login")
      setAuthenticated(false)
      localStorage.clear()
    }).catch((error)=>{
      console.log(error)
      Swal.fire({
        title: "Network Erro",
        text: "Please check your internet connection",
        icon: "error"
      })
    })
  }

  return (
  <>
    <div className="mt-5 flex flex-row justify-between w-full px-5">
      <Link to='/'>
        <img className="w-[200px]" src={Logo} alt="Logo here" />
      </Link>
      {user ? (
        <div className="group hover:cursor-pointer relative">
          <div className="bg-[#2666CF] rounded-full text-white w-[50px] h-[50px] flex justify-center items-center">
            <h3 className="font-semibold text-xl">{userData.firstName[0]}</h3>
          </div>
          <div className="invisible shadow-black shadow-md p-2 rounded-md absolute right-10 top-10 group-hover:visible"
          >
            <li className="flex flex-row list-none p-2 hover:bg-slate-100" onClick={()=>setOpenModal(true)}>
              <UserCircle2/>
              <span className="ml-2">Account</span>
            </li>
            <li className="flex flex-row list-none p-2 hover:bg-slate-100" onClick={()=>logOut()}>
              <LogOut/>
              <span className="ml-2">LogOut</span>
            </li>
          </div>
        </div>
      )
      :
      (
        <button className="bg-black text-white py-2 rounded-md text-md px-3 font-semibold"
         onClick={()=>navigate('/login')}
        >
          Get Started
        </button>
      )
      }
      {openModal && <Account openModal={openModal} setOpenModal={setOpenModal}/>}
    </div>
  </>

  )
}

export default Navbar