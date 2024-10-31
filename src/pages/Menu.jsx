import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react";
import Logo from "../assets/images/freeZones.jpg"
import Waakye from "../assets/images/waakye.jpg";

const slides = [
    
  { image: Waakye, description:'African Dish Waakye'},
  { image: Waakye, description:'Waakye' },
  { image: Waakye, description:'Waakye'}
  
  
  ]

const Menu = () => {
  return (
    <div>
      <Link to='/'>
        <div className="mt-5">
          <img className="w-[200px]" src={Logo} alt="Logo here" />
        </div>
      </Link>

      <section className="mt-10">
        <button className="flex flex-row text-center font-extrabold 
        bg-red-500 rounded-full py-3 px-5 text-white m-auto"
        >
          Monday Specials.
          <span className="ml-2"><ChevronDown size={25} /></span>
        </button>
        <div className="grid grid-cols-3 mt-4 gap-3 mobile:grid-cols-1 tablet:grid-cols-2 p-4">
          {slides.map((item,index)=>(
            <div key={index} className="max-w-[300px] rounded-lg m-auto flex flex-col">
              <div>
                <img className="rounded-tl-lg rounded-tr-lg" src={item.image} alt="product here"/>  
              </div>
              <div className="flex flex-col justify-between bg-[#F5F5F5] py-4 px-2 rounded-lg">
                <h3>{item.description}</h3>
                <button className="bg-[#2666CF] text-white text-center p-2 rounded-md mt-2">Select</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Menu