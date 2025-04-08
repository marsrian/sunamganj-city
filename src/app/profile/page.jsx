import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import ProfileForm from "./components/ProfileForm";

const getUserData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/me`,
      {
        headers: new Headers(await headers()),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const ProfilePage = async () => {
  const userData = await getUserData();

  if (!userData) {
    return <div className="text-center mt-20 text-red-500">Error loading profile. Login first</div>;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-20 max-w-7xl mx-auto px-4 py-8 mt-4">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={userData.image}
          width={200}
          height={200}
          alt={userData.name}
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
        <h1 className="text-3xl font-bold">{userData.name}</h1>
        <p>Email: {userData.email}</p>
      </div>
      <ProfileForm userData={userData} />
    </div>
  );
};

export default ProfilePage;
