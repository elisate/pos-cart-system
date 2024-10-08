import React, { useState, useEffect } from "react";
import ShoppingCart from "./ShoppingCart";
import { MdOutlineShoppingBag } from "react-icons/md";
import SignIn from "./SignIn";
import axios from "axios";

const Status_loged = () => {
  const [cart, setCart] = useState(false);
  const [modal, setModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Toggle modal visibility
  const handlemodal = () => {
    setModal(!modal);
  };

  // Toggle cart visibility
  const handlecart = () => {
    setCart(!cart);
  };

  useEffect(() => {
    const getTotalQuantity = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const passkey = userToken.token;
      console.log(passkey);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cart/total-quantity`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${passkey}`,
            },
          }
        );
        setTotalQuantity(response.data.totalQuantity);
      } catch (err) {
        console.log(err.response ? err.response.data : err.message);
      }
    };
    getTotalQuantity();
  }, []);

  // Fetching userToken from localStorage
  let userToken = JSON.parse(localStorage.getItem("userToken"));

  // Logout function
  function Logout() {
    localStorage.removeItem("userToken");
    window.location.href = "/";
  }

  // Check if userToken exists
  if (!userToken) {
    return (
      <div className="flex items-center justify-center h-full">
        {modal && <SignIn handlemodal={handlemodal} />}
        <button
          onClick={handlemodal}
          className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none transition duration-300"
        >
          Sign In
        </button>
      </div>
    );
  } else {
    return (
      <div className="relative flex items-center space-x-4">
        {cart && <ShoppingCart handlecart={handlecart} />}

        <div className="relative flex items-center space-x-4">
          <div className="relative cursor-pointer" onClick={handlecart}>
            <MdOutlineShoppingBag
              className="text-[#093A3E] cursor-pointer hover:text-[#06504C]"
              size={35} // Adjust the size if needed
            />

            <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-white bg-[#093A3E] rounded-full text-xs">
              {totalQuantity}
            </span>
          </div>
          <img
            src="profile.png"
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-gray-300"
            onClick={Logout}
          />
        </div>
      </div>
    );
  }
};

export default Status_loged;
