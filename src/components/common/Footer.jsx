import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaEarthAsia, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="p-12 lg:py-16 lg:px-20 bg-gray-900 text-white">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="">
          <h4 className="font-bold text-2xl">
            <Link href="/">Sunamganj City</Link>
          </h4>
          <p className="mt-3">Sunamganj, Bangladesh</p>
        </div>
        <div className="">
          <h4 className="font-medium text-lg mt-4 md:mt-0">Important Links</h4>
          <ul className="mt-3 flex flex-col gap-2 md:gap-3">
            <li>
              <Link href="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-400">
                Events
              </Link>
            </li>
            <li>
              <Link href="/helpline" className="hover:text-gray-400">
                Helpline
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h4 className="font-medium text-lg mt-4 md:mt-0">Contact us</h4>
          <ul className="mt-3">
            <li className="mb-2 flex items-center gap-3">
              <FaMapMarkerAlt className="p-2 bg-white rounded-full text-black w-8 h-8" />{" "}
              Sunamganj, Sunamganj-3000
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="p-2 bg-white rounded-full text-black w-8 h-8" />{" "}
              marsrian40@gmail.com
            </li>
          </ul>
        </div>
      </section>

      <hr className="my-8" />

      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          <p>Built by Mars Rian💚</p>
        </div>
        <ul className="flex gap-3 mt-4 md:mt-0">
          <Link
            href="https://www.facebook.com/profile.php?id=61556193720658"
            target="_blank"
            className="hover:text-slate-400"
            title="Facebook"
          >
            <FaFacebook className="text-3xl border border-white p-1 rounded-full w-10 h-10" />
          </Link>
          <Link
            href="https://afzal-hussain-rian.vercel.app/"
            target="_blank"
            className="hover:text-slate-400"
            title="Portfolio"
          >
            <FaEarthAsia className="text-3xl border border-white p-1 rounded-full w-10 h-10" />
          </Link>
          <Link
            href="https://twitter.com/marsrian40"
            target="_blank"
            className="hover:text-slate-400"
            title="Twitter"
          >
            <FaXTwitter className="text-3xl border border-white p-1 rounded-full w-10 h-10" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/afzal-hussain-rian-91606a267/"
            target="_blank"
            className="hover:text-slate-400"
            title="Linkedin"
          >
            <FaLinkedin className="text-3xl border border-white p-1 rounded-full w-10 h-10" />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
