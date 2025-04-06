import React from "react";
import ServicesInfo from "./components/ServicesInfo";
import EventsInfo from "./components/EventsInfo";
import Header from "@/components/common/Header";

const HomePage = () => {
  return (
    <div className="">
      <Header />
      {/* Services Section: */}
      <section className="mt-8 max-w-7xl mx-auto px-2 md:px-0">
        <h1 className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double">
        সকল সেবার তত্ত্বাবলী 
        </h1>
        <ServicesInfo />
      </section>
      {/* Events Section: */}
      <section className="mt-16 max-w-7xl mx-auto px-2 md:px-0">
      <h1 className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double">
      আসন্ন ইভেন্ট সমূহ
        </h1>
        <EventsInfo />
      </section>
    </div>
  );
};

export default HomePage;
