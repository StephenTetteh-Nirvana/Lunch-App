import { motion, AnimatePresence } from 'framer-motion'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'

const ProductsPreview = ({ openPreview, setOpenPreview, selectedProducts }) => {

  const [isClosing,setIsClosing] = useState(false)
  const [loading,setLoading] = useState(false)
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
          ...doc.data().foods,
        }));
        processSelectedFoods(foodsArray)
        setLoading(false);
      })
      return unsub; // Unsubscribe from the snapshot listener when needed
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

    return filteredProducts
  };
  

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
                <div key={day} className='grid grid-cols-3 w-full gap-5 p-3'>
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
                <button className="bg-red-600 p-2 px-5 rounded-md text-white">
                  Submit
                </button>
                <button
                  className="bg-gray-500 p-2 px-5 rounded-md text-white ml-2"
                  onClick={() => closeModal()}
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
