import React from "react";
import { headers } from "next/headers";
import SingleBlogUpdate from "./components/SingleBlogUpdate";

export const generateMetadata = async ({ params }) => {
  try {
    const { id } = params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs/${id}`,
      { headers: new Headers(await headers()) }
    );

    if (!res.ok) throw new Error("Failed to fetch metadata");
    
    const blogData = await res.json();

    return {
      title: blogData?.blog_title || "Default Title",
      description: blogData?.description || "Default Description",
      keywords: blogData?.description?.split(" ") || [],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Fallback Title",
      description: "Fallback Description",
    };
  }
};

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
