import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useRegister = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const register = async (formData) => {
        const success = handleInputErrors(formData);
        if (!success) return;
        setLoading(true);

        try {
            // Debug: Log the data before sending
            console.log('Sending data:', formData);
            
            const res = await fetch("https://vendorvista-ydd8.onrender.com/api/vendor/register", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            // Debug: Check response status
            console.log('Response status:', res.status);
            
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log('Response data:', data);
            
            localStorage.setItem("User", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Registration successful!");
            navigate("/vendorlogin");
            
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, register };
};

function handleInputErrors(formData) {
    if (!formData ||
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.phone ||
        !formData.address?.pincode ||
        !formData.address?.addressLine ||
        !formData.address?.city ||
        !formData.address?.state ||
        !formData.address?.country) {
        toast.error("Please fill in all address fields");
        return false;
    }
    return true;
}

export default useRegister;