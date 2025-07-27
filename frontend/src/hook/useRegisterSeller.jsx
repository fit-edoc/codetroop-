import  { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'



const useRegisterSeller = () => {

    const Navigate = useNavigate()

    const {setAuthUser} = useAuthContext()
    const [loading,setLoading] = useState(false)


    const register = async(formData)=>{
       const success =  handleInputErrors(formData)
       if(!success) return;
        setLoading(true)

        try {
            const res = await fetch("http://localhost:8000/api/seller/register",{
                method:"Post",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ formData}),
            })


            const data = await res.json()
            if(data?.success){
                Navigate("/login")
            }
            if(data.error){
                
                throw new Error(data.error);
                
                
            }
            
            localStorage.setItem("User", JSON.stringify(data));
            setAuthUser(data);
            
        } catch (error) {

        
            
            
        }
    
    finally{
        setLoading(true)
    }
};
  return {loading,register}
    
  
}

export default useRegisterSeller

function handleInputErrors(formData) {
	if (!formData) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
