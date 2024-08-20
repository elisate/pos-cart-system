import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import Register from "./Register";

const SignIn = ({ handlemodal }) => {
     const [reg, setReg] = useState(false);
     const handlereg = () => {
       setReg(!reg);
     };

  const navigate = useNavigate(); // Initialize the useNavigate hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("userToken", JSON.stringify(res.data));
      Notify.success("Login successful!");

      // Redirect to another page after successful login
      navigate("/products"); // Replace '/product' with the desired path
    } catch (error) {
      console.log(error);
      Notify.failure("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {reg && <Register handlereg={handlereg}/>}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={() => handlemodal(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          <FaTimes />
        </button>

        {/* Sign In Form */}
        <h2 className="text-2xl font-bold mb-6 text-center text-[#093A3E]">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#093A3E] text-white py-2 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <button
            onClick={handlereg}
              className="text-[#093A3E] font-bold hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
