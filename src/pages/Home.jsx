import { MoveRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/images/freeZones.jpg"
import Carousel from "../components/Carousel"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white w-full">
      <Link to='/'>
        <div className="mt-5">
          <img className="w-[200px]" src={Logo} alt="Logo here" />
        </div>
      </Link>
      <div className="mt-10 tablet:mt-32">
        <div className="w-full grid grid-rows-2">
          <div className="flex flex-col justify-center items-center">
            <motion.h1 variants={{ 
              hidden: { opacity: 0, y: 80 }, 
              show: { opacity: 1, y: 0} 
              }}
              initial='hidden'
              animate='show'
              transition={{delay:0.3,duration:0.5}}
              className="text-center font-extrabold text-4xl mobile:text-2xl 
              bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 bg-clip-text text-transparent pb-1"
            >
              Ordering Lunch Made Easy!
            </motion.h1>

            <motion.p variants={{
              hidden: {opacity: 0, y: 85},
              show: {opacity: 1, y: 0}
              }}
              initial='hidden'
              animate='show'
              transition={{delay:0.5,duration:0.5}}
              className="font-semibold mt-3 text-center w-[50%] mobile:w-[90%] mobile:text-sm mobile:mt-1 
              tablet:w-[80%]"
            >
              You can now make your weekly order of food from the comfort of
              your laptop or phone.This system contains amazing features that
              makes your ordering process quite simple.
            </motion.p >

            <motion.button variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 } 
              }}
              initial='hidden'
              animate='show'
              transition={{delay:1,duration:1}}
              whileTap={{rotate: 360}}
              className="bg-red-500 px-6 py-3 group rounded-full mt-5 flex flex-row 
             text-white mobile:py-3"
              onClick={()=>navigate('/menu')}
            >
              Place your weekly order
              <span className="ml-2 group-hover:ml-5 transition-margin duration-300 ease-in-out">
                <MoveRight color="white" />
              </span>
            </motion.button>

          </div>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
