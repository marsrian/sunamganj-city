import React from "react";
import { headers } from 'next/headers';
import AllServiceInfo from "./components/AllServiceInfo";

const fetchServiceInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/services`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

export const metadata = {
  title: "Approval Service",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const ApprovalServicePage = async () => {
    const data = await fetchServiceInfo();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Approval Services
      </h1>
      <AllServiceInfo data={data} />
    </div>
  );
};

export default ApprovalServicePage;
