import React from "react";
import { headers } from "next/headers";
import AllBlogInfo from "./components/AllBlogInfo";

const fetchServiceInfo = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/blogs`,
    {
      headers: new Headers(await headers()),
    }
  );
  const result = await res.json();
  return result;
};

const ApprovalBlogPlage = async () => {
  const data = await fetchServiceInfo();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Approval Blogs
      </h1>
      <AllBlogInfo data={data} />
    </div>
  );
};

export default ApprovalBlogPlage;
