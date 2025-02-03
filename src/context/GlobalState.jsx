import { createContext, useState } from "react"
import { doc , setDoc , getDoc, updateDoc, onSnapshot } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { db,auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const GlobalState = createContext()

export const StateProvider = ({children}) => {
  const [isAuthenticated,setAuthenticated] = useState(false)
  const [errMsg,setErrMsg] = useState('')
  const navigate = useNavigate()

  //Register user
  const registerUser = async (email,password,firstName,lastName,department,setLoading) => {
    try{
      if ( firstName && lastName && email && password ) {
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password)
        const user = auth.currentUser
        if(user){
          const date = new Date().toDateString();
          const time = new Date().toLocaleTimeString()
          const userDoc = doc(db,"Users",user.uid)
          await setDoc(userDoc,{
            Img:'',
            firstName:firstName,
            lastName:lastName,
            email:email,
            department:department,
            status:'Personnel',
            createdAt:`${date} at ${time}`,
            submitted:false,
          })
          
          // Add users to the personnel section based on their department 
          const departmentDoc = doc(db,"Departments",department)
          const docRef = await getDoc(departmentDoc)
          if(docRef.exists()){
            const personnelArray = docRef.data().personnels || []
            const personnelData = {
              Img:'',
              firstName:firstName,
              lastName:lastName,
              email:email,
              status:'Personnel',
              createdAt:`${date} at ${time}`,
              orders:[]
            }

            await updateDoc(departmentDoc,{
              personnels : [...personnelArray,personnelData]
            })
          }
        }
        Swal.fire({
          title: "Account created successfully",
          text: "Please login your account.",
          icon: "success"
        })
        setTimeout(()=>{
          navigate('/login')
        },1500)
      }else{
        alert('Fill all fields')
      }
      
    }catch(error){
      setTimeout(()=>{
        setErrMsg('')
      },2500)
      switch(error.code){
        case 'auth/invalid-email':
          setErrMsg('Invalid Email')
        break;

        case 'auth/invalid-credential':
          setErrMsg('Wrong Email/Password')
        break;

        case 'auth/email-already-in-use': 
          setErrMsg('Email is already taken.')
        break;

        case 'auth/wrong-password': 
          setErrMsg('Wrong Password')
        break;

        case 'auth/email-already-exists':
          setErrMsg('Email Already Exists')
        break;

        default: 
          setErrMsg('Please check your internet connection.')
        break
      }
    }finally{
      setLoading(false)
    }
  }

  //Login user
  const LoginUser = async(email,password,setLoading) =>{
    if(email === "" || password === "" ){
      alert('Fill all fields')
      return;
    }
    try{
      setLoading(true)
      await signInWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser;
      if(user){
        const userDocRef = doc(db,"Users",user.uid)
        const userDoc = await getDoc(userDocRef) 
        if(userDoc.exists){
          localStorage.setItem('userData',JSON.stringify(userDoc.data()))
        }
      }
      localStorage.setItem('user',JSON.stringify(true))
      setAuthenticated(true)
      navigate('/')
    }
    catch(error){
      setTimeout(()=>{
        setErrMsg('')
      },2500)
      switch(error.code){
        case 'auth/invalid-email':
          setErrMsg('Invalid Email')
        break;

        case 'auth/invalid-credential':
          setErrMsg('Wrong Email/Password')
        break;

        case 'auth/email-already-in-use': 
          setErrMsg('Email Already Exists')
        break;

        case 'auth/wrong-password': 
          setErrMsg('Wrong Password')
        break;

        case 'auth/user-not-found':
          setErrMsg('Account does not exist.')
        break;

        case 'auth/weak-password':
          setErrMsg('Password should be 6 characters or more.')
        break;

        default: 
          setErrMsg('Please check your internet connection.')
        break;
      }
    }finally{
    setLoading(false)
    }
  }

  //Fetch and update user data in localStorage
  const fetchUser = async() => {
    const user = auth.currentUser
    if(user){
      const userDocRef = doc(db, "Users", user.uid);
      const unsub = onSnapshot(userDocRef,(userData)=>{
        if(userData.exists()){
          localStorage.setItem('userData',JSON.stringify(userData.data()))
          console.log('data fetched')
        }
      })
      return unsub
    }
  }

  return (
    <GlobalState.Provider value={{
      registerUser,errMsg,LoginUser,
      isAuthenticated,setAuthenticated,fetchUser
    }}>
      {children}
    </GlobalState.Provider>
  )
}

export default GlobalState