import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginVenders from "../Pages/venders/Login";
import SignupVenders from "../Pages/venders/Signup";
import LoginSeller from "../Pages/seller/Login";
import SignupSeller from "../Pages/seller/Signup";
import Home from "../Pages/Home";
import SellerDashboard from "../Pages/seller/SellerDashboard";
import VenderDashboard from "../Pages/venders/VenderDashboard";





const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        
        children:[
            {
                path:"/",
                element : <Home/>
            },
            {
                path:"/vendorlogin",
                element:<LoginVenders/>
            },
            {
                path:"/vendorsignup",
                element:<SignupVenders/>
            },
             {
                path:"/login",
                element:<LoginSeller/>
            },
             {
                path:"/signup",
                element:<SignupSeller/>
            },
            {
                path:"/vendor/dashboard",
                element:<VenderDashboard/>
            },
            {
                path:"/seller/dashboard",
                element:<SellerDashboard/>
            },
           
        ]
        
    }
])


export default router