import axios from 'axios';
import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/authContext';


const LoginVenders = () => {

  

   const [formData, setFormData] = useState({
    email: "",
    password: ""
   
  });

  
    const navigate = useNavigate() 

const {login} = useAuthContext()

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const [loading ,setLoading] = useState(false) 
 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/vendor/login",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      toast.success("welcome to vendorvista");
      login(res.data.user,"vendor")
      navigate("/vendor/dashboard");
  
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "login failed. Please try again.";
                         console.log(error)
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-screen bg-slate-900 relative flex justify-center items-center'>
        <div className="h-[90%] w-[70%] bg-gradient-to-l from-black via-neutral-600 to-black/20 absolute rounded-lg shadow-[0px_4px_6px_0px_rgba(249,_115,_22,_0.5)]">
           
               
        
             <div className='h-full w-full flex rounded-lg'>
                <div className="h-full w-[50%] flex items-center justify-center flex-col">
                  <h1 className='text-[50px] text-white font-head capitalize text-center'>welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#a6e3ff] via-[#fff] to-[#0084ff]'>vendorvista</span></h1>
                    <form action="" onSubmit={handleSubmit} className='flex items-center justify-center flex-col gap-3'>
                      <input type="text"   name='email' value={formData.email}  className='h-[50px] w-[300px] rounded-md shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]' placeholder='email'  onChange={handleChange}/> <br />
                    <input type="password"  name='password' value={formData.password} className='h-[50px] w-[300px] rounded-md shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]' placeholder='password' onChange={handleChange} /> <br />
                    <button className='px-7 py-2.5 bg-gradient-to-tr from-[#d89742] to-orange-100 mt-5 rounded-md'>LOGIN </button>
                    </form>
                </div>
                  <div className="h-full w-[50%] ">
                    <img src="/tt.png" className='h-full w-full object-contain object-center' alt="image" />
                  </div>
        

             </div>
        </div>
      
    </div>
  )
}

export default LoginVenders
