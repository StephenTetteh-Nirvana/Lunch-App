import { motion, AnimatePresence } from 'framer-motion'
import { onSnapshot, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { Check } from 'lucide-react'
import { auth, db } from '../firebase'
import { useContext, useEffect, useState } from 'react'
import GlobalState from '../context/GlobalState'

const ProductsPreview = ({ openPreview, setOpenPreview, selectedProducts }) => {
  const userData = localStorage.getItem('userData') !== null ? JSON.parse(localStorage.getItem('userData')) : []  
  const {fetchUser} = useContext(GlobalState)

  const [isClosing,setIsClosing] = useState(false)
  const [loading,setLoading] = useState(false)
  const [submitting,setSubmitting] = useState(false)
  const [orderSubmitted,setOrderSubmitted] = useState(false)
  const [changesDisabled,setChangesDisabled] = useState(false)
  const [matchedProducts,setMatchedProducts] = useState([])

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setOpenPreview(false)
    }, 200)
  }

  // Fetch all foods items from Firestore
  const fetchFoods = () => {
    try {
      setLoading(true);
      const unsub = onSnapshot(collection(db, "Foods"), (snapshot) => {
        const foodsArray = snapshot.docs.map((doc) => ({
          ...doc.data().foods
        }))
        processSelectedFoods(foodsArray)
        setLoading(false);
      })
      return unsub
    } catch (error) {
      console.log("Error fetching foods:", error);
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchFoods()
  },[])

  const processSelectedFoods = (foodsArray) => {
    const filteredProducts = {};
  
    // Convert the foods array into a single array of all foods
    const flattenedFoods = foodsArray.flatMap(foodGroup => 
      Object.values(foodGroup) // Extract values from each object
    )
  
    Object.entries(selectedProducts).forEach(([day, productID]) => {
      if (productID) {
        // Find the product in the flattened foods array
        const foundProduct = flattenedFoods.find((product) => product.id === productID);
  
        if (foundProduct) {
          filteredProducts[day] = foundProduct;
        }
      }
    });
    setMatchedProducts(filteredProducts)
  }
 
  //Submit orders to HR
  const submitOrders = async() => {
    try{
      const user = auth.currentUser
      setSubmitting(true)
      setChangesDisabled(true)
      const docRef = doc(db,'Departments',userData.department)
      const docData = await getDoc(docRef)
      if(docData.exists()){
        const personnelsArray = docData.data().personnels || []
        const updatedPersonnelArray = personnelsArray.map((personnel)=>{
          if(personnel.email === user.email){
            return {
            ...personnel,
            orders:[...personnel.orders,matchedProducts]
            }
          }
          return personnel
        })
                 
        await updateDoc(docRef,{
          personnels: updatedPersonnelArray
        })
      }

      //Set submitted value to true when order list is submitted
      if(user){
        const userDocRef = doc(db,'Users',user.uid)
        const userData = await getDoc(userDocRef)
        if(userData.exists()){
          await updateDoc(userDocRef,{
            submitted: 'true'
          })
        }
        setOrderSubmitted(true)
        await fetchUser()
        setTimeout(()=>{
          closeModal()
        },1500)
      }else{
        console.log('user not detected')
      }
    }
    catch(error){
     console.log(error)
    }finally{
      setSubmitting(false)
      setChangesDisabled(false)
    }
  }

  return (
    <AnimatePresence>
      {openPreview && !isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }} 
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"
        >
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 0.9, opacity: 1 }} 
            exit={{ scale: 1, opacity: 0 }} 
            transition={{ duration: 0.2 }} 
            className="bg-white p-4 rounded-md"
          >
            { loading &&
              <button className="p-2 px-24 rounded-md text-white">
                <div className="w-7 h-7 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              </button>
            }

            {Object.entries(matchedProducts).map(([day, product]) => (
              <>
                <div key={product.price} className='grid grid-cols-3 w-full gap-5 p-3'>
                  <h3 className='font-semibold'>{day}</h3>
                  <p>{product?.product}</p>
                  <p>{product?.price}</p>
                </div>
              </>
            ))}

            <h3 className='flex justify-end text-lg font-semibold'>
              Total: {Object.values(matchedProducts).reduce((total, product) => total + product.price, 0)}
            </h3>

            <div className="mt-2 flex justify-center">
              { submitting ?
                <button className="bg-red-600 p-2 px-5 rounded-md text-white flex flex-row gap-3">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <h3>Submitting...</h3>
                </button>
                :
                orderSubmitted ? 
                <button className=" mt-5 bg-green-700 p-2 flex flex-row justify-center items-center w-full text-md gap-2
                  rounded-md text-white cursor-auto"
                >
                  <Check size={20} />
                  Your order was submitted successfully.
                </button>
                :
                <button className="bg-red-600 p-2 px-5 rounded-md text-white" onClick={()=>submitOrders()}>
                  Submit
                </button>
              }
              <button
                className={`bg-gray-500 p-2 px-5 rounded-md text-white ml-2 ${orderSubmitted && 'hidden'}`}
                onClick={() => closeModal()}
                disabled={changesDisabled}
                style={changesDisabled ? {opacity:0.5,cursor:'not-allowed'}:{}}
              >
                Make changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductsPreview
