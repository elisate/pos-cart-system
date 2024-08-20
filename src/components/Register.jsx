import React from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix";

const Register = ({ handlereg }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, phone, password } = data;
    try {
      const formData = {
        name,
        email,
        phone,
        password,
      };

      const res = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Save the token in localStorage
      localStorage.setItem("userToken", JSON.stringify(res.data));

      // Show success message
      Notify.success("Registration successful!");

     
      navigate("/products"); 
    } catch (error) {
      console.log(error);
      // Show error message
      Notify.failure("Registration failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={() => handlereg(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-[#093A3E]">
          Register
        </h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
                placeholder="Enter your name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
                placeholder="Enter your phone number"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500">Phone is required</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#093A3E]"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#093A3E] text-white py-2 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
