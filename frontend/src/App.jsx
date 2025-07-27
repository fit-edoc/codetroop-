import { useContext, useState } from 'react'
import { useAuthContext } from './context/authContext'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/venders/Login'
import Signup from './Pages/venders/Signup'
import NotFound from './Pages/NotFound'
import Nav from './Pages/Nav'
import Home from './Pages/Home'
  import { ToastContainer, toast } from 'react-toastify';
import Footer from './Pages/Footer'
function App() {
  const {authUser} = useAuthContext()

  

  return (
   <>


   <Nav/>
   <div className="min-h-screen w-screen">
    <Outlet/>
   </div>
   <Footer/>
   <ToastContainer/>
    
   {/* <Routes>
    

<Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
<Route path='/login' element={authUser ? <Navigate  to={"/"}/> :<Login/> } />
<Route  path='/signup' element={authUser? <Navigate  to={"/"} /> : <Signup/>}/>
<Route path='*' element={<NotFound/>} />

   </Routes> */}
   
   </>
  )
}

export default App
