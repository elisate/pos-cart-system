import React, { useState, useEffect } from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const ShoppingCart = ({ handlecart }) => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const owner = userToken.user.name;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCartProducts = async () => {
      const userToken = JSON.parse(localStorage.getItem("userToken"));
      const passkey = userToken.token;
      try {
        const response = await axios.get(
          `http://localhost:8000/api/cart/products`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${passkey}`,
            },
          }
        );
        setCart(response.data.products);
      } catch (err) {
        console.log(err.response ? err.response.data : err.message);
      }
    };
    getCartProducts();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const passkey = userToken.token;

    try {
      await axios.put(
        `http://localhost:8000/api/cart/update-quantity`,
        {
          product_id: productId,
          quantity: newQuantity,
          user_id: userToken.user.id, // Ensure you send the correct user ID
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${passkey}`,
          },
        }
      );

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[90vh] flex flex-col overflow-hidden">
        <button
          onClick={handlecart}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
        >
          <FaTimes />
        </button>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#093A3E]">
            ShoppingCart For<span className="text-[#00B09E]"> {owner}</span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center p-4 border-b">
                  <img
                    src={`http://localhost:8000/storage/${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-gray-800 text-base">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Unit price: ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center ml-4">
                    <button
                      className="text-[#093A3E] border-2 border-gray-300 rounded-full p-2 text-sm"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-3 text-gray-700 text-base">
                      {item.quantity}
                    </span>
                    <button
                      className="text-[#093A3E] border-2 border-gray-300 rounded-full p-2 text-sm"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <span className="font-semibold text-gray-800 text-base ml-4">
                    ${item.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 bg-gray-100 rounded-lg mt-4">
          <div className="flex justify-between mb-4 text-base font-semibold text-gray-700 px-4">
            <span>Subtotal:</span>
            <span>
              $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="p-4">
            <Link to="/checkout">
              <button className="w-full bg-[#093A3E] text-white py-3 rounded-full hover:bg-[#00B09E] focus:outline-none transition duration-300">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
