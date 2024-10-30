import { Gitlab, User, AlignJustify, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [hamburgerOpen,setHamburgerOpen] = useState(false)

  return (
  <>
    <div className="bg-black p-3 h-20 w-full flex flex-row justify-between overflow-hidden">
      <div className="my-auto ml-6">
       <Gitlab color="white" size={30}/>
      </div>

      <ul className="flex flex-row my-auto gap-4 mobile:hidden">
        <Link to="/">
          <li className="relative group p-1 text-white hover:cursor-pointer">
            Home
            <span 
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-300 ease-in-out 
              scale-x-0 group-hover:scale-x-100"
              ></span>
          </li>
        </Link>
        <Link to="/about">
          <li className="relative group p-1 text-white hover:cursor-pointer">
            About
            <span 
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-300 ease-in-out 
              scale-x-0 group-hover:scale-x-100"
              ></span>
          </li>
        </Link>
        <Link to="/services">
          <li className="relative group p-1 text-white hover:cursor-pointer">
            Services
            <span 
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-white transition-transform duration-300 ease-in-out 
              scale-x-0 group-hover:scale-x-100"
              ></span>
          </li>
        </Link>
      </ul>

      <div className="group my-auto mr-5 hover:cursor-pointer overflow-hidden">
        <div className="rounded-full p-3 my-auto flex items-center justify-center
         bg-white mr-5 hover:cursor-pointer mobile:hidden">
          <User />  
        </div>
        <div className="hidden mobile:block">
          {hamburgerOpen ? (
            <button onClick={()=>setHamburgerOpen(false)}>
              <X color="white" size={30} />
            </button>
            ) 
            :
            ( 
            <button onClick={()=>setHamburgerOpen(true)}>
              <AlignJustify color="white" size={30}/>
            </button>
          )}
        </div>
      </div>
    </div>

    <div className={`transition-all duration-300 w-full bg-black 
      ${ hamburgerOpen ? 'h-[200px] visible' : 'h-0 invisible'} z-50`}
    >
      <ul className="py-5 flex flex-col justify-center items-center gap-2">
        <li className="py-2 text-white text-xl">
           Home
        </li>
        <li className="py-2 text-white text-xl">
           About
        </li>
        <li className="py-2 text-white text-xl">
           Services
        </li>
      </ul>
    </div>
  </>

  )
}

export default Navbar