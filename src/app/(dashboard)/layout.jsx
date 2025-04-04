import React from "react";
import Sidebar from "@/components/common/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-2 px-2 mt-2">
        {/* <ul className="border">
          <li className="border-b p-3">
            <Link href="/dashboard/members">Members</Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/services_all">
              Show All Service
            </Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/add_service">Add Service</Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/approval_service">
              Approval Service
            </Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/events/all_event">
              Show All Event
            </Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/events/add_event">Add Event</Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/approval_service">
              Approval Event
            </Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/approval_service">
              Show All Blog
            </Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/approval_service">Add Blog</Link>
          </li>
          <li className="border-b p-3">
            <Link href="/dashboard/services/approval_service">
              Approval Blog
            </Link>
          </li>
        </ul> */}
        <Sidebar />
      </div>
      <div className="md:col-span-10 px-4 mt-4">{children}</div>
    </div>
  );
};

export default layout;
