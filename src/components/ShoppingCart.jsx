import React from "react";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShoppingCart = ({handlecart}) => {
  const cartItems = [
    {
      id: 1,
      image: "/prod1.PNG",
      name: "Packed Green Beans",
      unitPrice: 5000,
      quantity: 2,
    },
    {
      id: 2,
      image: "/prod2.PNG",
      name: "Organic Green Cabbage",
      unitPrice: 4000,
      quantity: 1,
    },
    {
      id: 2,
      image: "/prod2.PNG",
      name: "Organic Green Cabbage",
      unitPrice: 4000,
      quantity: 1,
    },
    {
      id: 2,
      image: "/prod2.PNG",
      name: "Organic Green Cabbage",
      unitPrice: 4000,
      quantity: 1,
    },
    // Add more items as needed
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[90vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
        onClick={handlecart}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 text-2xl"
        >
          <FaTimes />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#093A3E]">
            Shopping<span className="text-[#00B09E]">Cart</span>
          </h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center p-4 border-b">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-gray-800 text-base">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Unit price: ${item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center ml-4">
                    <button className="text-[#093A3E] border-2 border-gray-300 rounded-full p-2 text-sm">
                      <FaMinus />
                    </button>
                    <span className="mx-3 text-gray-700 text-base">
                      {item.quantity}
                    </span>
                    <button className="text-[#093A3E] border-2 border-gray-300 rounded-full p-2 text-sm">
                      <FaPlus />
                    </button>
                  </div>
                  <span className="font-semibold text-gray-800 text-base ml-4">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtotal and Checkout Button */}
        <div className="border-t pt-4 bg-gray-100 rounded-lg mt-4">
          <div className="flex justify-between mb-4 text-base font-semibold text-gray-700 px-4">
            <span>Subtotal:</span>
            <span>
              $
              {cartItems
                .reduce(
                  (total, item) => total + item.unitPrice * item.quantity,
                  0
                )
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
