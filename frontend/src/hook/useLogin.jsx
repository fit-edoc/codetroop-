import  { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'



const useLogin = () => {

    const Navigate = useNavigate()

    const {setAuthUser} = useAuthContext()
    const [loading,setLoading] = useState(false)


    const login = async(formData)=>{
       const success =  handleInputErrors(formData)
       if(!success) return;
        setLoading(true)

        try {
            const res = await fetch("https://vendorvista-ydd8.onrender.com/api/vendor/login",{
                method:"Post",
                headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ formData}),
            })


            const response = await res.json();
            console.log('API Response:', response);
            
            if (response.error) {
              throw new Error(response.error);
            }

            if (response.user) {
              login({
                ...response.user,
                token: response.token // Include token in user object
              }, 'vendor');
              Navigate('/vendor/dashboard');
            } else {
              throw new Error('Invalid user data in response');
            }
            
        } catch (error) {

        
            
            
        }
    
    finally{
        setLoading(true)
    }
};
  return {loading,login}
    
  
}

export default useLogin

function handleInputErrors(formData) {
	if (!formData) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}
