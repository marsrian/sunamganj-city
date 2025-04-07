import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="p-12 lg:p-20 bg-black text-white">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="">
          <h4 className="font-bold text-2xl">Sunamganj City</h4>
          <p className="mt-3">Sunamganj, Bangladesh</p>
        </div>
        <div className="">
          <h4 className="font-medium text-lg mt-4 md:mt-0">Store</h4>
          <ul className="mt-3">
            <li className="mb-1">Shop Now</li>
            <li className="mb-1">Product Categories</li>
            <li className="mb-1">Special Offers</li>
            <li className="mb-1">Exclusive Deals</li>
          </ul>
        </div>
        <div className="">
          <h4 className="font-medium text-lg mt-4 md:mt-0">Contact</h4>
          <ul className="mt-3">
            <li className="mb-1">📱: +8801640033846</li>
            <li className="mb-1">📧: marsrian40@gmail.com</li>
          </ul>
        </div>
        <div className="">
          <h4 className="font-medium text-lg mt-4 md:mt-0">Communities</h4>
          <ul className="mt-3">
            <li className="mb-1">Contributions</li>
            <li className="mb-1">Community Engagement</li>
            <li className="mb-1">Donate</li>
            <li className="mb-1">Volunteer Opportunities</li>
            <li>Local Initiatives</li>
            <li>Community Partnerships</li>
          </ul>
        </div>
      </section>

      <hr className="my-8" />

      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <p>&copy; 2025. All Rights Reserved.</p>
          <p>Built by Mars Rian💚</p>
        </div>
        <ul className="flex items-center gap-5 mt-4 md:mt-0">
          <li>FB</li>
          <li>WA</li>
          <li>LINK</li>
          <li>YT</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
