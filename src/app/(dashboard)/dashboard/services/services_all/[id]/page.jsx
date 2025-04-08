import React from "react";
import SingleServiceUpdate from "./components/SingleServiceUpdate";
import { headers } from "next/headers";

export const generateMetadata = async ({ params }) => {
  try {
    const { id } = params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services/${id}`,
      { headers: new Headers(await headers()) }
    );

    if (!res.ok) throw new Error("Failed to fetch metadata");
    
    const serviceData = await res.json();

    return {
      title: serviceData?.service_name || "Default Title",
      description: serviceData?.description || "Default Description",
      keywords: serviceData?.description?.split(" ") || [],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Fallback Title",
      description: "Fallback Description",
    };
  }
};

const UpdateServicePage = async ({ params }) => {
  const p = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services/${p.id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return (
    <div>
      <h1 className="text-[#444] dark:text-white text-center text-2xl font-semibold mt-5">
        Update Service Info
      </h1>
      <SingleServiceUpdate data={data} />
    </div>
  );
};

export default UpdateServicePage;
