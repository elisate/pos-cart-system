import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import Status_loged from "./Status_loged";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const handlemodal = () => {
    setModal(!modal);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50">
      {modal && <SignIn handlemodal={handlemodal} />}

      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-gray-800 text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8" />
        </Link>
        
<Status_loged/>
        {/* <button
          className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none transition duration-300"
          onClick={handlemodal}
        >
          Sign In
        </button> */}
        
      </div>
    </nav>
  );
};

export default Navbar;
