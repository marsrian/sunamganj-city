import React from "react";
import { headers } from "next/headers";
import SingleEventUpdate from "./components/SingleEventUpdate";

export const generateMetadata = async ({ params }) => {
  try {
    const { id } = params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events/${id}`,
      { headers: new Headers(await headers()) }
    );

    if (!res.ok) throw new Error("Failed to fetch metadata");
    
    const eventData = await res.json();

    return {
      title: eventData?.event_title || "Default Title",
      description: eventData?.description || "Default Description",
      keywords: eventData?.description?.split(" ") || [],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Fallback Title",
      description: "Fallback Description",
    };
  }
};

const UpdateEventPage = async ({ params }) => {
  const p = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events/${p.id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return (
    <div>
      <h1 className="text-[#444] text-center text-2xl font-semibold">
        Update Service Info
      </h1>
      <SingleEventUpdate data={data} />
    </div>
  );
};

export default UpdateEventPage;
