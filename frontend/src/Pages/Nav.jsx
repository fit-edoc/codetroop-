import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

import VendorNav from './VendorNav';
import SellerNav from './SellerNav';

const Nav = () => {
  const { authUser } = useAuthContext();

  if (authUser?.role) {
    return authUser.role === 'vendor' ? <VendorNav /> : <SellerNav />;
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
          {authUser ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-slate-600 transition">
                <span>Dashboard</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 text-white rounded-lg shadow-lg py-1 z-10 hidden group-hover:block">
                {authUser.role === 'vendor' && (
                  <>
                    <Link to="/vendor/dashboard" className="block px-4 py-2 hover:bg-slate-600 rounded-t-lg">
                      Vendor Dashboard
                    </Link>
                    <Link to="/vendor/profile" className="block px-4 py-2 hover:bg-slate-600">
                      My Profile
                    </Link>
                    <Link to="/vendor/products" className="block px-4 py-2 hover:bg-slate-600">
                      My Products
                    </Link>
                  </>
                )}
                
                <Link to="/orders" className="block px-4 py-2 hover:bg-slate-600">
                  My Orders
                </Link>
                <button 
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-slate-600 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <ul className='flex gap-8'>
              <Link to="/vendorsignup">
                <li className="hover:text-orange-300 transition">Vendor</li>
              </Link>  
              <Link to="/signup">
                <li className="hover:text-orange-300 transition">Seller</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;