import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Helpline",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const HelplinePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 mt-5">
      <h1 className="text-2xl font-medium text-center underline decoration-double underline-offset-8 ">
        Helpline
      </h1>
      <p className="mt-8">
        ফেইসবুক গ্রুপ:{" "}
        <Link
          href="https://www.facebook.com/share/g/1FVAYz5exS/"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          সুনামগঞ্জ হেল্পলাইন Sunamganj HelpLine
        </Link>
      </p>
    </div>
  );
};

export default HelplinePage;
