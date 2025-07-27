import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import router from "./routes/index.jsx";

createRoot(document.getElementById("root")).render(
 
  <AuthContextProvider>
   <RouterProvider router={router}></RouterProvider>
  </AuthContextProvider>
   
);
