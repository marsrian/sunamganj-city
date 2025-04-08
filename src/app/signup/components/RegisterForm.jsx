"use client";
import { registerUser } from "@/app/actions/auth/registerUser";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    setLoading(false);
    form.reset();
    router.push("/login");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-5">
      <label htmlFor="name" className="text-[#444] dark:text-white font-semibold">
        Name
      </label>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <label htmlFor="email" className="text-[#444] dark:text-white font-semibold mt-6">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <label htmlFor="password" className="text-[#444] dark:text-white font-semibold mt-6">
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <label
        htmlFor="confirmPassword"
        className="text-[#444] dark:text-white font-semibold mt-6"
      >
        Confirm Password
      </label>
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <button
        type="submit"
        disabled={loading}
        className={`text-white text-lg font-semibold leading-7 rounded-[10px] py-3 mt-4 cursor-pointer ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#FF3811]"
        }`}
      >
        {loading ? "Signing..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;