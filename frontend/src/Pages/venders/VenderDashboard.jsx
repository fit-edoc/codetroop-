import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VenderDashboard = () => {


  const [profile,setProfile] = useState([])

const getProfile = async()=>{

  try {
    
   const res =  await axios.get("/api/vendor/profile")

   console.log(res.data)
  } catch (error) {
    
  }
}


useEffect(()=>{
  getProfile()
},[])

  return (
    <div>
      vendrer
    </div>
  )
}

export default VenderDashboard
