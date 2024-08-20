import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { useState } from "react";
import SignIn from "./SignIn";
const Navbar = () => {
  const[modal,setModal]=useState(false);
  const handlemodal=()=>{
    setModal(!modal);
  }
  return (
    <nav className="bg-white p-4 shadow-md">
      {modal && <SignIn handlemodal={handlemodal} />}

      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-gray-800 text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>

        <button
          
          className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none transition duration-300"
          onClick={handlemodal}
        >
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
