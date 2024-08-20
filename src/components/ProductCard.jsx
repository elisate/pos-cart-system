import React, { useState } from "react";
import { FaEye, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const products = [
    {
      id: 1,
      image: "/prod1.PNG",
      name: "Packed Green Beans",
      price: "5000",
      category: "Vegetables",
    },
    {
      id: 2,
      image: "/prod2.PNG",
      name: "Organic Green Cabbage",
      price: "4000",
      category: "Vegetables",
    },
    {
      id: 3,
      image: "/prod3.PNG",
      name: "Gourmet Garden Lightly Dried",
      price: "7000",
      category: "Spices",
    },
    {
      id: 4,
      image: "/prod4.PNG",
      name: "Fresh Cilantro",
      price: "5000",
      category: "Herbs",
    },
  ];

  const categories = ["All Categories", "Vegetables", "Spices", "Herbs"];

  const filteredProducts =
    selectedCategory === "All Categories"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Product Category</h1>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00B09E]"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={item.image}
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
              <Link to="/cart">
                <button className="flex items-center bg-[#093A3E] text-white px-3 py-1 rounded-full hover:bg-opacity-90 focus:outline-none">
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
