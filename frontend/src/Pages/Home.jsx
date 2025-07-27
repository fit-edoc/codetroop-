import React from 'react'
import Nav from './Nav'
import ProductPreview from './product/ProductPreview'

const Home = () => {
  return (
    <>
   
    
    <div className='min-h-screen w-screen bg-slate-900'>
      <div className='h-[40vh] w-screen flex justify-center items-center '>
        <h1 className='text-[4.5vw] text-white font-hero text-center'>Stock More,Stress Less  <br /> <span className='bg-gradient-to-r from-violet-300 to-violet-400  rounded-full text-black px-5'>VendorsVista</span> Keeps Your Cart Rolling</h1>
      </div>

      <div className='h-[60vh] w-screen  relative flex justify-center items-end'>
        <div className='h-[55vh]  w-[90%] mx-auto   rounded-t-md'>
          <img src="/heroo.jpg" className='h-full w-full object-cover object-top rounded-t-md' alt="" />
        </div>
      </div>
    </div>
    <ProductPreview /> 
    </>
  )
}

export default Home
