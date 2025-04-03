import React from "react";
import { headers } from "next/headers";
import SingleEventUpdate from "./components/SingleEventUpdate";

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
