import React from "react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { childVariants, parentVariants } from "@/components/common/Variants";

const getBlogData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`, {
    headers: new Headers(await headers()),
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

const BlogLayout = async ({ children }) => {
  const blogs = await getBlogData();
  return (
    <div className="max-w-7xl mx-auto px-2 m:px-0 mt-3 md:mt-8 mb-4 md:mb-8 grid grid-cols-1 md:grid-cols-6 gap-4">
      <div className="md:col-span-4">
        <div className="">{children}</div>
      </div>
      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-3 md:p-6 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Blog</h2>
          {blogs
            .filter((blog) => blog.approval === "approved")
            .map((blog) => (
              <div
                key={blog._id}
                className="flex items-start gap-2 mb-2 rounded-lg shadow-md p-2 border bg-white hover:shadow-lg"
              >
                {blog?.image && (
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={blog.image}
                      alt={blog.blog_title}
                      className="rounded-sm"
                    />
                  </div>
                )}
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-xl font-medium dark:text-black"
                >
                  {blog.blog_title}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;
