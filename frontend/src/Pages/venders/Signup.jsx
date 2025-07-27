import React, { useState } from "react";
// import useRegister from "../../hook/useRegister";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";

const SignupVenders = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: {
      pincode: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const navigate = useNavigate()

  // const { register, loading } = useRegister();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if the field belongs to nested address object
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const [loading ,setLoading] = useState(false)

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/vendor/register",
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      toast.success("Registration successful!");
      navigate("/vendorlogin");
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen  bg-slate-900 relative flex justify-center items-center">
      <div className="h-[90%] w-[90%] bg-gradient-to-l from-black via-neutral-600 to-black/20 absolute rounded-lg shadow-[0px_4px_6px_0px_rgba(249,_115,_22,_0.5)]">
        <div className="h-full w-full flex rounded-lg">
          <div className="h-full w-[50%]   flex flex-col justify-center items-center gap-5">
            <h1 className="text-[50px] text-white font-head capitalize text-center">
              welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6e3ff] via-[#fff] to-[#0084ff]">vendorvista</span>
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                value={formData.email}
                name="email"
                placeholder="Email"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                placeholder="Pincode"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.addressLine"
                value={formData.address.addressLine}
                placeholder="Address Line"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                placeholder="City"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                placeholder="State"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                placeholder="Country"
                className="h-[50px] w-[300px] rounded-md px-4 shadow-[inset_1px_-6px_10px_-2px_rgba(0,_0,_0,_0.2)]"
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-tr from-[#d89742] to-orange-100  text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
            <Link to={'/vendorlogin'} className="underline text-white"> already have a account
          </Link>
          </div>
          <div className="h-full w-[50%]  px-4">
            <img
              src="/tt.png"
              className="h-full w-full object-cover object-center"
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupVenders;
