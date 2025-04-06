import { headers } from "next/headers";
import React from "react";

const getUserData = async ({ id }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users/public/${id}`,
    {
      headers: new Headers(await headers()),
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  const data = await res.json();
  return data;
};

const ProfilePage = async ({ params }) => {
  const { id } = params;
  const userData = await getUserData(id);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-4">
      <h1 className="text-3xl font-bold">Profile Page: {userData.name}</h1>
    </div>
  );
};

export default ProfilePage;
