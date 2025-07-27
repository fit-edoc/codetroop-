import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
import { useEffect, useRef, useState } from 'react';


const VendorNav = () => {
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        if (isOpen) {
          e.preventDefault();
          const firstItem = dropdownRef.current.querySelector('a');
          if (firstItem) firstItem.focus();
        }
        break;
      default:
        break;
      }
    }

  return (
    <div className='h-[100px] w-screen flex bg-slate-900 text-white'>
      <div className='h-[60px] w-[70%] flex absolute left-[16%] top-3 rounded-full bg-slate-500'>
        <div className='h-full w-[40%] flex justify-center items-center'>
          <Link to={'/'}>
            <h1 className='font-logo text-[30px]'>VendorVista</h1>
          </Link>
        </div>
        
        <div className="h-full w-[60%] flex items-center justify-evenly">
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full"  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
>
              <span>Dashboard</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isOpen && (<div className="absolute right-0 mt-2 w-48 bg-slate-700 text-white rounded-lg shadow-lg py-1 z-10"   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
          >
              <Link to="/vendor/dashboard" className="block px-4 py-2 hover:bg-slate-600 rounded-t-lg">
                Vendor Dashboard
              </Link>
              <Link to="/vendor/profile" className="block px-4 py-2 hover:bg-slate-600">
                My Profile
              </Link>
              <Link to="/vendor/products" className="block px-4 py-2 hover:bg-slate-600">
                My Products
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

export default VendorNav;