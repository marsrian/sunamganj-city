"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const router = useRouter();
  const session = useSession();
  const handleSocialLogin = async (providerName) => {
    signIn(providerName);
  };

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
      toast.success("Logged in successfully");
    }
  }, [session?.status]);

  return (
    <div className="flex items-center justify-center gap-4 mt-2">
      {/* facebooK: Github */}
      <button
        // onClick={() => handleSocialLogin("github")}
        className="p-3 rounded-full bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
        >
          <path
            d="M17.3047 27.1211V16.5346H20.8761L21.407 12.3896H17.3047V9.74947C17.3047 8.55339 17.6379 7.73447 19.3545 7.73447H21.5297V4.03902C20.4714 3.9256 19.4076 3.87083 18.3432 3.87497C15.1863 3.87497 13.0189 5.80214 13.0189 9.34002V12.3819H9.4707V16.5268H13.0267V27.1211H17.3047Z"
            fill="#3B5998"
          />
        </svg>
      </button>
      {/* Google: */}
      <button
        onClick={() => handleSocialLogin("google")}
        className="p-3 rounded-full bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clipPath="url(#clip0_351_751)">
            <path
              d="M4.6875 10.0001C4.6875 9.00919 4.96051 8.08095 5.4348 7.28615V3.91474H2.0634C0.725313 5.65255 0 7.77048 0 10.0001C0 12.2297 0.725313 14.3476 2.0634 16.0854H5.4348V12.714C4.96051 11.9192 4.6875 10.991 4.6875 10.0001Z"
              fill="#FBBD00"
            />
            <path
              d="M10 15.3126L7.65625 17.6564L10 20.0001C12.2296 20.0001 14.3475 19.2748 16.0854 17.9367V14.5689H12.7175C11.9158 15.0449 10.9836 15.3126 10 15.3126Z"
              fill="#0F9D58"
            />
            <path
              d="M5.43488 12.7139L2.06348 16.0854C2.3284 16.4294 2.61688 16.7589 2.92902 17.0711C4.81777 18.9598 7.32898 20 10.0001 20V15.3125C8.06164 15.3125 6.3627 14.2687 5.43488 12.7139Z"
              fill="#31AA52"
            />
            <path
              d="M20 10.0001C20 9.39169 19.9449 8.78216 19.8363 8.18849L19.7483 7.70806H10V12.3956H14.7442C14.2835 13.312 13.5752 14.0597 12.7175 14.5689L16.0853 17.9367C16.4294 17.6718 16.7589 17.3833 17.0711 17.0712C18.9598 15.1824 20 12.6712 20 10.0001Z"
              fill="#3C79E6"
            />
            <path
              d="M13.7565 6.24354L14.1708 6.65783L17.4854 3.3433L17.0711 2.92901C15.1823 1.04026 12.6711 6.10352e-05 10 6.10352e-05L7.65625 2.34381L10 4.68756C11.419 4.68756 12.7531 5.24014 13.7565 6.24354Z"
              fill="#CF2D48"
            />
            <path
              d="M10.0001 4.68756V6.10352e-05C7.32902 6.10352e-05 4.81781 1.04026 2.92902 2.92897C2.61688 3.24112 2.3284 3.57061 2.06348 3.91471L5.43488 7.28612C6.36273 5.73131 8.06168 4.68756 10.0001 4.68756Z"
              fill="#EB4132"
            />
          </g>
          <defs>
            <clipPath id="clip0_351_751">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default SocialLogin;