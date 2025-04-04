import React from "react";
import { headers } from 'next/headers';
import AllEventsInfoPage from "./components/AllEventsInfoPage";

const fetchEventInfo = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/events`, {
    headers: new Headers(await headers())
  })
  const result = await res.json();
  return result;
}

const ApprovalEventPage = async () => {
    const data = await fetchEventInfo();
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
        Approval Events
      </h1>
      <AllEventsInfoPage data={data} />
    </div>
  );
};

export default ApprovalEventPage;