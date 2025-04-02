import SanitizedContent from "@/app/components/SanitizedContent";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { FaBullhorn, FaRegWindowClose} from "react-icons/fa";

export const getSingleEvent = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/news/${id}`,
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
    <div>
      <h3 className="text-5xl font-extrabold text-gray-900">
        {eventDetails.news_title}
      </h3>
      {eventDetails.event_status === "Event closed" ? (
        <p className="bg-amber-200 flex items-center gap-2 py-3 px-5 rounded-sm mt-5">
          <FaRegWindowClose className="text-amber-400" />
          {eventDetails?.event_status}
        </p>
      ) : (
        <p className="bg-green-300 flex items-center gap-2 py-3 px-5 rounded-sm mt-5">
          <FaBullhorn className="text-green-600" />
          {eventDetails?.event_status}
        </p>
      )}
      <p className="mt-5">ইভেন্টের সময়কাল: {eventDetails.start_date} থেকে {eventDetails.end_date}</p>
      {eventDetails?.image && (
        <Image
          src={eventDetails.image}
          alt={eventDetails.news_title}
          width={500}
          height={300}
          className="w-full h-[400px] mt-6"
          sizes=""
        />
      )}
      {eventDetails.description && (
        <div className="prose prose-sm max-w-none text-gray-600 mt-6">
          <SanitizedContent html={eventDetails.description} />
        </div>
      )}
    </div>
  );
};

export default SingleEventDetailsPage;
