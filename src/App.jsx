import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect } from "react";
import NotFound from "./pages/NotFound";

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
  const userStatus = () => {
    if(!user && location.pathname === '/menu'){
      navigate('/login')
    }
  }

  useEffect(()=>{
    userStatus()
  })
  
  return (
    <div>
      {location.pathname ==='/login' || location.pathname ==='/register' 
      || location.pathname ==='/forgotPassword' || location.pathname ==='/*' ? ''
        :
        <Navbar/>
      }

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  
  )
};

export default App;
