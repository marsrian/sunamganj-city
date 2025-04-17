import SanitizedContent from "@/app/components/SanitizedContent";
import ScrollToTop from "@/components/common/ScrollToTop";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export const getSingleService = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services/${id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return data;
};

export const generateMetadata = async ({ params }) => {
  try {
    const { id } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services/${id}`,
      { headers: new Headers(await headers()) }
    );

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

const page = async ({ params }) => {
  const id = await params.id;
  const serviceDetails = await getSingleService(id);
  return (
    <>
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 m:px-0 mt-5 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {serviceDetails.service_name}
        </h1>
        {serviceDetails?.image && (
          <Image
            src={serviceDetails.image}
            alt={serviceDetails.service_name}
            width={500}
            height={300}
            className="w-full h-[250px] md:h-[400px] mt-5"
            sizes=""
          />
        )}
        {serviceDetails.description && (
          <div className="prose prose-sm max-w-none dark:text-white mt-5">
            <SanitizedContent html={serviceDetails.description} />
          </div>
        )}
      </div>
    </>
  );
};

export default page;
