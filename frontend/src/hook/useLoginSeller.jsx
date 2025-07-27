import  { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'



const useLoginSeller = () => {

    const Navigate = useNavigate()

    const {setAuthUser} = useAuthContext()
    const [loading,setLoading] = useState(false)


    const login = async(formData)=>{
       const success =  handleInputErrors(formData)
       if(!success) return;
        setLoading(true)

        try {
            const res = await fetch("http://localhost:8000/api/seller/login",{
                method:"Post",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ formData}),
            })


            const data = await res.json()
            if(data?.success){
                Navigate('/sellerdashboard')
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
  return {loading,login}
    
  
}

export default useLoginSeller

function handleInputErrors(formData) {
	if (!formData) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
