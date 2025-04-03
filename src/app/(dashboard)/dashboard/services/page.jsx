import React from "react";
import Link from "next/link";

const AddServicePage = () => {
  return (
    <div>
      <h1 className="text-lg font-medium text-center mt-5">Service:</h1>
      <div className="flex justify-center space-x-5">
        <Link href={`/dashboard/services/add_service`}>Add Service</Link>
        <Link href={`/dashboard/services/services_all`}>Show All Service</Link>
      </div>
    </div>
  );
};

export default AddServicePage;
