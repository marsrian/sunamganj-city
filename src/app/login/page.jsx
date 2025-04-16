import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForm from "./components/LoginForm";
import SocialLogin from "./components/SocialLogin";
import * as motion from "motion/react-client";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-6 md:mt-10 px-2 md:px-0">
      <motion.div
        initial={{ x: -60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/assets/niladri.webp"
          width={500}
          height={500}
          alt="login"
          className="rounded-[10px] md:h-[500px]"
        />
      </motion.div>
      <motion.div
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="p-4 border border-[#D0D0D0] rounded-[10px] w-full md:w-[500px]"
      >
        <h1 className="text-[#444] dark:text-white text-center text-2xl font-semibold">
          Login
        </h1>
        <LoginForm />
        <p className="text-[#444] dark:text-white text-center font-medium mt-4">
          Or Sign up with
        </p>
        <SocialLogin />
        <p className="text-[#737373] text-lg text-center mt-5">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#FF3811] font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
