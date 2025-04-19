import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";

export const metadata = {
  title: "Helpline",
  description:
    "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
};

const contactTitle = "Contact";

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const HelplinePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 md:px-0 mt-5">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="text-2xl font-medium text-center underline decoration-double underline-offset-8 "
      >
        {contactTitle.split("").map((char, index) => (
          <motion.span key={index} variants={staggerVariants}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <p className="mt-8 text-lg">
        <span className="font-medium">Facebook:</span>{" "}
        <Link
          href="https://www.facebook.com/profile.php?id=61556193720658"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Afzal Hussain Rian
        </Link>
      </p>
      <p className="mt-3 text-lg">
        <span className="font-medium">Email:</span> marsrian40@gmail.com
      </p>
    </div>
  );
};

export default HelplinePage;
