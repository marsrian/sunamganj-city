import Image from "next/image";
import Link from "next/link";
import React from "react";
import RegisterForm from "./components/RegisterForm";
import SocialLogin from "../login/components/SocialLogin";
import * as motion from "motion/react-client";

const SignUpPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-6 px-2 md:px-0">
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
          className="rounded-[10px] md:h-[650px]"
        />
      </motion.div>
      <motion.div
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="p-4 border border-[#D0D0D0] rounded-[10px] w-full md:w-[500px]"
      >
        <h1 className="text-[#444] dark:text-white text-center text-xl font-semibold">
          Sign Up
        </h1>
        <RegisterForm />
        <p className="text-[#444] dark:text-white text-center font-medium mt-4">
          Or Sign Up with
        </p>
        <SocialLogin />
        <p className="text-[#737373] text-lg text-center mt-3">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FF3811] font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
