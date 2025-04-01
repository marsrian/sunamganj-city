import React from "react";
import ServicesInfo from "./components/ServicesInfo";

const HomePage = () => {
  return (
    <div className="">
      <div className="w-full h-[200px] md:h-[600px] rounded-lg bg-[url('/assets/shimul-bagan.jpg')] bg-cover bg-center">
        <div className="flex justify-center items-center h-full bg-black/50 rounded-lg">
          <h1 className="text-2xl md:text-5xl text-white text-center font-extrabold md:leading-[55px]">
            Welcome to <br /> Sunamganj Info Website
          </h1>
        </div>
      </div>
      {/* Services Section: */}
      <div className="mt-8">
        <h1 className="text-center font-extrabold text-3xl md:text-5xl leading-[55px]">
          All Services Information
        </h1>
        <ServicesInfo />
      </div>
    </div>
  );
};

export default HomePage;
