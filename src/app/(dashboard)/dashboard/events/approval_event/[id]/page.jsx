import SanitizedContent from "@/app/components/SanitizedContent";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import ApprovalEventForm from "./components/ApprovalEventForm";

export const getSingleEvent = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events/${id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return data;
};

const SingleEventApprovalPage = async ({ params }) => {
  const id = await params.id;
  const eventDetails = await getSingleEvent(id);
  const { event_title, image, description } = eventDetails;
  return (
    <div className="max-w-7xl mx-auto px-4 m:px-0 mt-5">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
        {event_title}
      </h1>
      {image && (
        <Image
          src={image}
          alt={event_title}
          width={500}
          height={300}
          className="w-full h-[400px] mt-5"
          sizes=""
        />
      )}
      {description && (
        <div className="prose prose-sm max-w-none text-gray-600 dark:text-white mt-5">
          <SanitizedContent html={description} />
        </div>
      )}
      <ApprovalEventForm eventDetails={eventDetails} />
    </div>
  );
};

export default SingleEventApprovalPage;
