import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div className="flex justify-center space-x-5">
        <Link
          href="/dashboard/members"
          className="border p-2 border-gray-300 text-lg font-medium text-gray-900"
        >
          Members Info
        </Link>
        <Link
          href="/dashboard/services"
          className="border p-2 border-gray-300 text-lg font-medium text-gray-900"
        >
          Services Info
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
