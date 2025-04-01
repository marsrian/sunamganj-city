"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaAlignLeft, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("session", session);
  const [isOpen, setIsOpen] = useState(true);
  const handleTog1e = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="max-w-7xl mx-auto py-4 px-3 md:px-0">
      <nav className="flex justify-between items-center">
        <h3 className="text-2xl md:text-3xl font-bold text-green-800">
          Sunamganj City
        </h3>
        <ul className="hidden md:flex justify-between space-x-8">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/about">
            <li>About</li>
          </Link>
          <Link href="/helpline">
            <li>Helpline</li>
          </Link>
          <Link href="/dashboard">
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
