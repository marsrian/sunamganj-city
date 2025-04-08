import React from "react";
import ServiceForm from "@/components/form/ServiceForm";

export const metadata = {
  title: "Add Service",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const AddServicePage = () => {
  return (
    <div>
      <h1 className="text-lg text-center text-gray-900 dark:text-white font-medium mt-5">
        {" "}
        Add New Service:
      </h1>
      <ServiceForm />
    </div>
  );
};

export default AddServicePage;
