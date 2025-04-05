import React from "react";
import { headers } from "next/headers";
import SingleBlogUpdate from "./components/SingleBlogUpdate";

const UpdateBlogPage = async ({ params }) => {
  const p = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs/${p.id}`,
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
      <SingleBlogUpdate data={data} />
    </div>
  );
};

export default UpdateBlogPage;
