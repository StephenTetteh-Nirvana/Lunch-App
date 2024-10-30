import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Menu from "./pages/Menu"

const App = () => {
  
  return (
    <div className="bg-white px-5">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
      </Routes>
    </div>
  
  )
};

export default App;
