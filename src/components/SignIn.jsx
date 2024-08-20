import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Notify } from "notiflix";

const SignIn = () => {
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
      navigate("/product"); // Replace '/dashboard' with the desired path
    } catch (error) {
      console.log(error);
      Notify.failure("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
