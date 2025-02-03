import { ChevronDown, CircleCheck, Eye, LucideBadgeCheck, MessageCircleWarning } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { onSnapshot, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { db,auth } from "../firebase"
import ProductsPreview from "../components/ProductsPreview"
import Waakye from "../assets/images/waakye.jpg"
import Loader from "../components/Loader"
import GlobalState from "../context/GlobalState"

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

const Menu = () => {

  const {fetchUser} = useContext(GlobalState)
  const userData = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : []  

  const [day,setDay] = useState('Monday')
  const [dropdown,setDropdown] = useState(false)
  const [loading,setLoading] = useState(false)
  const [foods,setFoods] = useState([])
  const [preview,setPreview] = useState(false)
  const [openPreview,setOpenPreview] = useState(false)
  const [selectedProducts,setSelectedProducts] = useState({
    Monday:null,
    Tuesday:null,
    Wednesday:null,
    Thursday:null,
    Friday:null
  })

  const updateDay = (day) => {
    setDay(day)
    setDropdown(false)
  }
  
  const fetchFoods = () => {
    try{
      setLoading(true)
      const unsub = onSnapshot(doc(db,"Foods",day),(snapshot)=>{
        const allFoods = snapshot.data().foods || []
        setFoods(allFoods)
        localStorage.setItem('foods',JSON.stringify(allFoods))
        setLoading(false)
      })
      return unsub;
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  
  // Select food for each day
  const selectFood = (productID) => {
    const foundProduct = foods.find((p)=>p.id === productID)
    if(foundProduct){
      setSelectedProducts((prevState)=>({
        ...prevState,
        [day]:productID
      }))
    }
  }
  
  //Check if each day has a product selected. 
  useEffect(() => {
    const allSelected = Object.entries(selectedProducts).every(
      ([day,productID]) => productID !== null
    )
    setPreview(allSelected)
  }, [selectedProducts]);

  useEffect(()=>{
    fetchFoods()
  },[day])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser();
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, []);
  
  if(userData.submitted === 'true') {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div>
          <LucideBadgeCheck color="green" size={100}/>
        </div>
        <div className="mt-5">
          <h1 className="text-xl font-semibold">Your order list for the week has been submitted</h1>
          <h2 className="text-slate-600 text-md mt-1 text-center">You can order again next week</h2>
        </div>
      </div>
    )
  }else{
    return (
    <div className="px-5">
 
      <section className="mt-10">
        <div className="flex flex-col justify-center items-center">
          <button className="flex flex-row text-center font-extrabold 
          bg-red-500 rounded-full py-3 px-5 text-white active:scale-90 transition-scale duration-300 ease-in-out"
          onClick={()=>setDropdown(!dropdown)}
          >
            {day}
            <span className="ml-2"><ChevronDown size={25} /></span>
          </button>
          
          {preview ? (
            <button className="flex flex-row gap-3 font-bold bg-slate-300 rounded-full mt-2 py-3 px-5 
            active:scale-90 transition-scale duration-300 ease-in-out"
            onClick={()=>setOpenPreview(true)}
            >
              Preview
              <Eye color="#333333" size={25}/>
            </button>
          ) : ''}
          <AnimatePresence>

          {dropdown && (
            <motion.ul 
            className="mt-2 rounded-xl list-none py-2 text-center  shadow-black shadow-md w-[200px]"
            initial={{y:-10,opacity:0}}
            animate={{y:0,opacity:1}}
            exit={{y:-10,opacity:0}}
            transition={{delay:0.1,duration:0.2}}
            >
              {days.map((day,index)=>(
                <div 
                key={index} 
                className="hover:bg-gray-200 hover:cursor-pointer py-2"
                onClick={()=>updateDay(day)}
                >
                  {day}
                </div>
              ))}
            </motion.ul>
          )}
          </AnimatePresence>
        </div>

        { loading ? 
          <div className="flex justify-center items-center mt-10">
            <Loader/>
          </div>
        :
        foods.length > 0 ?
          <div className="grid grid-cols-3 gap-2 mt-5 mobile:grid-cols-1 tablet:grid-cols-2 p-4">
            {foods.map((item,index)=>(
              <div key={item.id} className="relative max-w-[300px] rounded-lg m-auto flex flex-col">
                <div>
                  <img className="rounded-tl-lg rounded-tr-lg" src={Waakye} alt="product here"/>  
                </div>
                <div className="flex flex-col justify-between bg-[#F5F5F5] py-4 px-2 rounded-lg">
                  <div className="flex flex-row justify-between">
                    <h3 className="font-bold">{item.product}</h3>
                    <p className="font-semibold">₵{item.price}.00</p>
                  </div>
                  <button 
                    className="bg-[#2666CF] text-white text-center p-2 rounded-md mt-2"
                    onClick={()=>selectFood(item.id)}
                  >
                    Select
                  </button>
                </div>
                { selectedProducts[day] === item.id ? (
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/50 rounded-lg">
                      <CircleCheck size={70} color="white" />
                      <h3 className="text-white mt-1 font-bold text-lg">Product selected</h3>
                    </div>
                  ) : null }
              </div>
            ))}
          </div>
        :
          <div className="mt-10 flex justify-center items-center w-full h-full mobile:flex-col">
            <div>
              <MessageCircleWarning size={100} color="grey" style={{margin:'auto'}} />
              <h1 className="font-bold mt-2 text-xl">No products are available at the moment.</h1>
            </div>
          </div>
        }
      </section>
      {openPreview && <ProductsPreview openPreview={openPreview} setOpenPreview={setOpenPreview} selectedProducts={selectedProducts}/>}
    </div>
  )
  }
}

export default Menu