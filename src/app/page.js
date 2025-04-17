import React from "react";
import ServicesInfo from "./components/ServicesInfo";
import EventsInfo from "./components/EventsInfo";
import Header from "@/components/common/Header";
import * as motion from "motion/react-client";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      {/* Services Section: */}
      <section className="mt-8 max-w-7xl mx-auto px-2 md:px-0">
        <motion.h1
          // initial={{ x: 60 }}
          // whileInView={{ x: 0 }}
          // transition={{ duration: 1, ease: "easeOut" }}
          className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double"
        >
          আমাদের সেবাসমূহ
        </motion.h1>
        <ServicesInfo />
      </section>
      {/* Events Section: */}
      <section className="mt-12 md:mt-16 max-w-7xl mx-auto px-2 md:px-0 mb-8">
        <motion.h1
          // initial={{ x: 60 }}
          // whileInView={{ x: 0 }}
          // transition={{ duration: 1, ease: "easeOut" }}
          className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double"
        >
          আসন্ন ইভেন্ট সমূহ
        </motion.h1>
        <EventsInfo />
      </section>
    </div>
  );
};

export default HomePage;
