import SanitizedContent from "@/app/components/SanitizedContent";
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

const page = async ({ params }) => {
  const id = await params.id;
  const serviceDetails = await getSingleService(id);
  return (
    <div>
      <h3>Services details: {serviceDetails.service_name}</h3>
      {serviceDetails?.image && (
          <Image
            src={serviceDetails.image}
            alt={serviceDetails.service_name}
            width={500}
            height={300}
            className="w-full h-[400px]"
            sizes=""
          />
      )}
      {serviceDetails.description && (
        <div className="prose prose-sm max-w-none text-gray-600">
          <SanitizedContent html={serviceDetails.description} />
        </div>
      )}
    </div>
  );
};

export default page;
