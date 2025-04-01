"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
    const role = "user";
    await registerUser({ name, email, password, role });
    toast.success("User registered successfully");
    form.reset();
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-5">
      <label htmlFor="name" className="text-[#444] font-semibold">
        Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label htmlFor="email" className="text-[#444] font-semibold mt-6">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label htmlFor="password" className="text-[#444] font-semibold mt-6">
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <label
        htmlFor="confirmPassword"
        className="text-[#444] font-semibold mt-6"
      >
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="text-[#A2A2A2] leading-7 border border-[#E8E8E8] rounded-[10px] py-4 px-6 mt-3"
      />
      <button
        type="submit"
        disabled={loading}
        className={`text-white text-lg font-semibold leading-7 rounded-[10px] py-4 mt-7 ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#FF3811]"
        }`}
      >
        {loading ? "Signing..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;