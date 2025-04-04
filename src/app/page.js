import React from "react";
import ServicesInfo from "./components/ServicesInfo";
import EventsInfo from "./components/EventsInfo";

const HomePage = () => {
  return (
    <div className="">
      <div className="w-full h-[200px] md:h-[600px] bg-[url('/assets/shimul-bagan.jpg')] bg-cover bg-center">
        <div className="flex justify-center items-center h-full bg-black/50">
          <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
            Welcome to <br /> Sunamganj Info Website
          </h1>
        </div>
      </div>
      {/* Services Section: */}
      <section className="mt-8 max-w-7xl mx-auto">
        <h1 className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double">
        সকল সেবার তত্ত্বাবলী 
        </h1>
        <ServicesInfo />
      </section>
      {/* Events Section: */}
      <section className="mt-16 max-w-7xl mx-auto">
      <h1 className="text-center font-semibold text-xl md:text-3xl leading-[55px] underline underline-offset-8 decoration-double">
      আসন্ন ইভেন্ট সমূহ
        </h1>
        <EventsInfo />
      </section>
    </div>
  );
};

export default HomePage;
