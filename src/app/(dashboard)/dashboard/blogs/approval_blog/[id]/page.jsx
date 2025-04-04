import SanitizedContent from "@/app/components/SanitizedContent";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import ApprovalForm from "./components/ApprovalForm";

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

const SingleBlogApprovalPage = async ({ params }) => {
  const id = await params.id;
  const blogDetails = await getSingleBlog(id);
  const { blog_title, image, description } = blogDetails;
  return (
    <div className="max-w-7xl mx-auto px-4 m:px-0 mt-5">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
        {blog_title}
      </h1>
      {image && (
        <Image
          src={image}
          alt={blog_title}
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
      <ApprovalForm blogDetails={blogDetails} />
    </div>
  );
};

export default SingleBlogApprovalPage;
