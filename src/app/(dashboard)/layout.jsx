import React from "react";
import Sidebar from "@/components/common/Sidebar";

export const metadata = {
  title: {
    default: "Sunamganj City | Discover Culture, Events & Local Life",
    template: "%s | Sunamganj City | Discover Culture, Events & Local Life",
  },
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="col-span-2 px-2 mt-2">
        <Sidebar />
      </div>
      <div className="md:col-span-10 px-4 mt-4 mb-6 md:mb-8">{children}</div>
    </div>
  );
};

export default layout;
