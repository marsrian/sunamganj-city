"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      try {
        const response = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false,
        });
        if (response.ok) {
          setLoading(false);
          router.push("/");
          form.reset();
        } else {
          toast.error("Invalid email or password");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        alert("Invalid email or password");
      }
    };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-5">
      <label htmlFor="email" className="text-[#444] dark:text-white font-semibold mt-6">
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <label htmlFor="password" className="text-[#444] dark:text-white font-semibold mt-6">
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="text-[#A2A2A2] dark:text-white leading-7 border border-[#E8E8E8] rounded-[10px] py-2 px-4 mt-1"
      />
      <button
        type="submit"
        disabled={loading}
        className={`text-white text-lg font-semibold leading-7 rounded-[10px] py-2 mt-7 cursor-pointer ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#FF3811]"
        }`}
      >
        {loading ? "Signing..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;