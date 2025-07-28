
import axios from 'axios'
import React, { useEffect } from 'react'

const SellerDashboard = () => {

  const getProfile =async()=>{

    try {

      const res = await axios.get('/api/seller/profile')

      console.log(res.data)
      
    } catch (error) {
      
    }
  }


  useEffect(()=>{
    getProfile()
  },[])
  return (
    <div>
      seller dash
    </div>
  )
}

export default SellerDashboard
