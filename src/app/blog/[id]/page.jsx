import SanitizedContent from "@/app/components/SanitizedContent";
import ScrollToTop from "@/components/common/ScrollToTop";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export const getSingleBlog = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs/${id}`,
    {
      headers: new Headers(await headers()),
    }
  );
  const data = await res.json();
  return data;
};

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

const SingleBlogPage = async ({ params }) => {
  const id = await params.id;
  const blogDetails = await getSingleBlog(id);
  const {
    writer_name,
    writer_image,
    writer_email,
    image,
    description,
    blog_title,
  } = blogDetails;
  return (
    <>
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-4 m:px-0 mt-5 mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {blog_title}
        </h1>
        <div className="flex items-center gap-2 mt-3 md:mt-5">
          <Image
            src={writer_image}
            width={40}
            height={40}
            alt={writer_name}
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {writer_name}{" "}
          </p>
        </div>
        {image && (
          <Image
            src={image}
            alt={blog_title}
            width={500}
            height={300}
            className="w-full h-60 md:h-[400px] mt-5"
            sizes=""
          />
        )}
        {description && (
          <div className="prose prose-sm max-w-none text-gray-600 dark:text-white mt-5">
            <SanitizedContent html={description} />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleBlogPage;
