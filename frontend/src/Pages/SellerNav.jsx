import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useEffect, useRef, useState } from 'react';


const SellerNav = () => {
  const { logout } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);
  
    // Handle hover events with delay to prevent flickering
    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };
  
    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // Small delay to allow moving to submenu
    };
  
    // Close when clicking outside
  

  return (
    <div className='h-[100px] w-screen flex bg-slate-100 text-white'>
      <div className='h-[60px] w-[70%] flex absolute left-[16%] top-3 rounded-full bg-slate-500'>
        <div className='h-full w-[40%] flex justify-center items-center'>
          <Link to={'/'}>
            <h1 className='font-logo text-[30px]'>VendorVista</h1>
          </Link>
        </div>
        
        <div className="h-full w-[60%] flex items-center justify-evenly">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-600 transition" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span>Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
           {isOpen &&( <div className="absolute right-0 mt-2 w-48 bg-slate-700 text-white rounded-lg shadow-lg py-1 z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Link to="/seller/dashboard" className="block px-4 py-2 hover:bg-slate-600 rounded-t-lg">
                Seller Dashboard
              </Link>
              <Link to="/seller/profile" className="block px-4 py-2 hover:bg-slate-600">
                My Profile
              </Link>
              <Link to="/seller/listings" className="block px-4 py-2 hover:bg-slate-600">
                My Listings
              </Link>
              <button 
                onClick={logout}
                className="block w-full text-left px-4 py-2 hover:bg-slate-600 rounded-b-lg"
              >
                Logout
              </button>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerNav;