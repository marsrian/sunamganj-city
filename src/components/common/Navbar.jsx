"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaAlignLeft, FaFacebookF, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  const [isOpen, setIsOpen] = useState(true);
  const handleTog1e = () => {
    setIsOpen(!isOpen);
  };

  // Today Date:
  const formattedDate = new Date().toLocaleDateString("en-Us", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="px-3 md:px-0">
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto text-white py-2 md:py-4 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between px-2 md:px-0">
          <h5>Welcome to Sunamganj City</h5>
          <div className="flex gap-5">
            <p>{formattedDate}</p>
            <button className="">
              <Link
                href="https://www.facebook.com/share/g/14ULfvzS6e/"
                target="_blank"
                className="flex items-center gap-1"
              >
                <FaFacebookF /> Sunamganj_HelpLine
              </Link>
            </button>
          </div>
        </div>
      </div>
      <nav className="flex justify-between items-center  py-3 border-b">
        <h3 className="text-2xl md:text-3xl font-bold text-green-800">
          Sunamganj City
        </h3>
        <ul className="hidden md:flex items-center justify-between space-x-8">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/blog">
            <li>Blog</li>
          </Link>
          <Link href="/helpline">
            <li>Helpline</li>
          </Link>
          <Link href="/dashboard/members">
            <li>Dashboard</li>
          </Link>

          {status == "authenticated" ? (
            <>
              <li>{session?.user?.name}</li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </>
          ) : (
            <Link href="/login">
              <li>Login</li>
            </Link>
          )}

          <ModeToggle />
        </ul>
        <div className="md:hidden">
          {isOpen ? (
            <button onClick={handleTog1e}>
              <FaAlignLeft className="text-xl" />
            </button>
          ) : (
            <button onClick={handleTog1e}>
              <FaTimes className="text-xl" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
