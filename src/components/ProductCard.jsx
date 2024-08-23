import React, { useState, useEffect } from "react";
import { FaEye, FaCartPlus } from "react-icons/fa";
import axios from "axios";
import { Notify } from "notiflix";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const quantity = 1;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product");
        setProducts(response.data.products);
      } catch (err) {
        console.log(err.response ? err.response.data : err.message);
      }
    };
    getProducts();
  }, []);

  const addToCart = async (productId) => {
    const userToken = JSON.parse(localStorage.getItem("userToken"));
    const passkey = userToken.token;
    const userId = userToken?.user?.id;

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/add",
        {
          product_id: productId,
          quantity,
          user_id: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${passkey}`,
          },
        }
      );

      Notify.success("Product added to cart!");

      // Reload the page
      window.location.reload();
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
      Notify.failure("Failed to add product to cart.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Product Category</h1>
        <select className="border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B09E]">
          <option>boillo</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products?.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={`http://localhost:8000/storage/${item.image}`}
              alt={item.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold mt-2">{item.name}</h2>
              <p className="text-gray-700 mt-1">${item.price}</p>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <button className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none">
                <FaEye className="mr-2" /> View
              </button>

              <button
                onClick={() => addToCart(item.id)}
                className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none"
              >
                <FaCartPlus className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
