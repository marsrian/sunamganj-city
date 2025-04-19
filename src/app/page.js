import React from "react";
import ServicesInfo from "./components/ServicesInfo";
import EventsInfo from "./components/EventsInfo";
import Header from "@/components/common/Header";
import * as motion from "motion/react-client";

const serviceTitle = "আমাদের সেবাসমূহ";
const eventTitle = "আসন্ন ইভেন্ট সমূহ";

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const HomePage = () => {
  return (
    <div className="">
      <Header />
      {/* Services Section: */}
      <section className="mt-8 max-w-7xl mx-auto px-2 md:px-0">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double"
        >
          {serviceTitle.split("").map((char, index) => (
            <motion.span key={index} variants={staggerVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <ServicesInfo />
      </section>
      {/* Events Section: */}
      <section className="mt-12 md:mt-16 max-w-7xl mx-auto px-2 md:px-0 mb-8">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double"
        >
          {eventTitle.split("").map((char, index) => (
            <motion.span key={index} variants={staggerVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <EventsInfo />
      </section>
    </div>
  );
};

export default HomePage;
