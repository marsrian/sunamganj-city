import React from "react";
import SingleServiceUpdate from "./components/SingleServiceUpdate";
import { headers } from "next/headers";

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
