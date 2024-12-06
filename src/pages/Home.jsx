import { MoveRight } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Carousel from "../components/Carousel"
import { useContext } from "react";
import GlobalState from "../context/GlobalState";

const Home = () => {
  const navigate = useNavigate()
  const {isAuthenticated} = useContext(GlobalState)

  
  return (
    <div className="bg-white w-full px-5">
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
              onClick={()=>isAuthenticated ? navigate('/menu') : navigate('/login')}
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
