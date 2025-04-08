import SanitizedContent from "@/app/components/SanitizedContent";
import ScrollToTop from "@/components/common/ScrollToTop";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { FaBullhorn, FaCalendarAlt, FaRegWindowClose } from "react-icons/fa";

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

const SingleEventDetailsPage = async ({ params }) => {
  const id = await params.id;
  const eventDetails = await getSingleEvent(id);
  return (
    <>
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 m:px-0 mt-4 md:mt-6 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {eventDetails.event_title}
        </h1>
        {eventDetails.event_status === "closed" ? (
          <p className="bg-amber-200 flex items-center gap-2 py-3 px-5 rounded-sm mt-5 md:mt-6 text-red-500">
            <FaRegWindowClose className="text-red-400" />
            {eventDetails?.event_status}
          </p>
        ) : (
          <p className="bg-green-300 flex items-center gap-2 py-3 px-5 rounded-sm mt-5">
            <FaBullhorn className="text-green-600" />
            {eventDetails?.event_status}
          </p>
        )}
        {eventDetails?.start_date && (
          <p className="flex md:items-center gap-2 text-gray-600 dark:text-white mt-5">
            <FaCalendarAlt className="text-gray-600" />
            ইভেন্টের সময়কাল: {eventDetails.start_date} থেকে{" "}
            {eventDetails.end_date}
          </p>
        )}
        {eventDetails?.image && (
          <Image
            src={eventDetails.image}
            alt={eventDetails.event_title}
            width={500}
            height={300}
            className="w-full h-60 md:h-[400px] mt-6"
            sizes=""
          />
        )}
        {eventDetails.description && (
          <div className="prose prose-sm max-w-none text-gray-600 dark:text-white mt-6">
            <SanitizedContent html={eventDetails.description} />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleEventDetailsPage;
