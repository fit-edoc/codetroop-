import React, { useState } from "react";
import { LinkIcon ,FacebookIcon,Instagram,TwitterIcon } from "lucide-react";


export const Footer = () => {

 
  


  return (
    <>
    <div className="h-[30vh] w-screen  bg-slate-600 relative  flex">
      <div className="h-full w-[30%] flex items-center justify-center">
        {" "}
        <ul className="text-white underline">
          <h1>Quick links</h1>
          <li>Home</li>
          <li>about</li>
          <li>contact us</li>
        </ul>
      </div>
      <div className="h-full w-[40%]  flex items-end py-5 justify-center"><div className="h-[40px] w-[200px] rounded-full bg-black text-white gap-3 flex items-center justify-center"><LinkIcon className="hover:text-pink-300"  /> <a href=""><FacebookIcon className="hover:text-red-300"/></a> <a href=""><Instagram className="hover:text-red-300"/></a> <a href=""><TwitterIcon className="hover:text-red-300"/></a></div></div>
      <div className="h-full w-[30%]  flex items-center justify-center"><h1 className="text-black text-[2vw] font-serif"></h1></div>
    </div>
  
    </>
  );
};

export default Footer