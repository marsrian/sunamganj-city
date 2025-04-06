import Image from "next/image";
import Link from "next/link";
import React from "react";
import RegisterForm from "./components/RegisterForm";
import SocialLogin from "../login/components/SocialLogin";

const SignUpPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-16 mt-6 px-2 md:px-0">
      <Image
        src="/assets/niladri.webp"
        width={500}
        height={500}
        alt="login"
        className="rounded-[10px] md:h-[650px]"
      />
      <div className="p-4 border border-[#D0D0D0] rounded-[10px] w-full md:w-[611px]">
        <h1 className="text-[#444] text-center text-xl font-semibold">
          Sign Up
        </h1>
        <RegisterForm />
        <p className="text-[#444] text-center font-medium mt-4">
          Or Sign Up with
        </p>
        <SocialLogin />
        <p className="text-[#737373] text-lg text-center mt-3">
        Already have an account? <Link href="/login" className="text-[#FF3811] font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;