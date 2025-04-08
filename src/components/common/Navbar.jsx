"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaAlignLeft, FaTimes } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    if (value === "profile") {
      router.push("/profile");
    } else if (value === "logout") {
      signOut();
    }
    setSelectedValue("");
  };

  // Today Date:
  const formattedDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="">
      <div className="bg-gray-900 p-1 md:p-0">
        <div className="max-w-7xl mx-auto text-white py-2 md:py-4 flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between px-2 md:px-0">
          <h5>Welcome to Sunamganj City</h5>
          <div className="flex justify-between gap-2 md:gap-5">
            <p>{formattedDate}</p>
          </div>
        </div>
      </div>
      <nav className="flex justify-between items-center px-3 md:px-8 py-2 md:py-1 border-b">
        <div className="flex items-center space-x-1">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              width={60}
              height={60}
              alt="logo"
              className="w-12 h-12 md:w-14 md:h-14 md:mt-1"
            />
          </Link>
          <h3 className="hidden md:block text-2xl md:text-3xl font-bold text-green-800">
            Sunamganj City
          </h3>
        </div>
        <ul className="hidden md:flex items-center justify-between space-x-8">
          <Link
            href="/"
            className={pathname === "/" ? "text-green-600 font-medium" : ""}
          >
            <li>Home</li>
          </Link>
          <Link
            href="/services"
            className={
              pathname === "/services" ? "text-green-600 font-medium" : ""
            }
          >
            <li>Service</li>
          </Link>
          <Link
            href="/events"
            className={
              pathname === "/events" ? "text-green-600 font-medium" : ""
            }
          >
            <li>Event</li>
          </Link>
          <Link
            href="/blog"
            className={pathname === "/blog" ? "text-green-600 font-medium" : ""}
          >
            <li>Blog</li>
          </Link>
          <Link
            href="/helpline"
            className={
              pathname === "/helpline" ? "text-green-600 font-medium" : ""
            }
          >
            <li>Helpline</li>
          </Link>
          {session?.user?.role === "admin" && (
            <Link
              href="/dashboard/members"
              className={
                pathname.includes("/dashboard")
                  ? "text-green-600 font-medium"
                  : ""
              }
            >
              <li>Dashboard</li>
            </Link>
          )}
          {session?.user?.role === "writer" && (
            <Link
              href="/dashboard/blogs/all_blog"
              className={
                pathname.includes("/dashboard")
                  ? "text-green-600 font-medium"
                  : ""
              }
            >
              <li>Dashboard</li>
            </Link>
          )}
          {session?.user?.role === "manager" && (
            <Link
              href="/dashboard/events/all_event"
              className={
                pathname.includes("/dashboard")
                  ? "text-green-600 font-medium"
                  : ""
              }
            >
              <li>Dashboard</li>
            </Link>
          )}

          {status == "authenticated" ? (
            <Select
              value={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value);
                handleSelect(value);
              }}
            >
              <SelectTrigger className="w-[180px] gap-2">
                <div className="flex items-center gap-2">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      width={24}
                      height={24}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.png"
                      width={24}
                      height={24}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <SelectValue placeholder={session.user.name} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Link
              href="/login"
              className={
                pathname === "/login" ? "text-green-600 font-medium" : ""
              }
            >
              <li>Login</li>
            </Link>
          )}

          <ModeToggle />
        </ul>
        <div className="flex gap-2 md:hidden">
          {status == "authenticated" && (
            <Select
              value={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value);
                handleSelect(value);
              }}
            >
              <SelectTrigger className="w-20 gap-2">
                <div className="flex items-center gap-2">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      width={24}
                      height={24}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.png"
                      width={24}
                      height={24}
                      alt="Profile"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="profile">Profile</SelectItem>
                  <SelectItem value="logout">Logout</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          <ModeToggle />
          <button
            onClick={handleToggle}
            className={`${!isOpen ? "hidden" : "block"}`}
          >
            <FaAlignLeft className="text-xl" />
          </button>

          <div
            className={`absolute top-20 left-0 w-60 h-screen bg-gray-900 text-white bg-opacity-80 z-10 transition-all duration-300 ease-in-out ${
              isOpen
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="relative">
              <ul className="flex flex-col items-center gap-8 mt-10">
                <ul className="flex flex-col items-center gap-8 mt-10">
                  <Link
                    href="/"
                    className={
                      pathname === "/" ? "text-green-600 font-medium" : ""
                    }
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    href="/services"
                    className={
                      pathname === "/services"
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    <li>Service</li>
                  </Link>
                  <Link
                    href="/events"
                    className={
                      pathname === "/events" ? "text-green-600 font-medium" : ""
                    }
                  >
                    <li>Event</li>
                  </Link>
                  <Link
                    href="/blog"
                    className={
                      pathname === "/blog" ? "text-green-600 font-medium" : ""
                    }
                  >
                    <li>Blog</li>
                  </Link>
                  <Link
                    href="/helpline"
                    className={
                      pathname === "/helpline"
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    <li>Helpline</li>
                  </Link>
                  {session?.user?.role === "admin" ? (
                    <Link
                      href="/dashboard/members"
                      className={
                        pathname.includes("/dashboard")
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      <li>Dashboard</li>
                    </Link>
                  ) : session?.user?.role === "writer" ? (
                    <Link
                      href="/dashboard/blogs/all_blog"
                      className={
                        pathname.includes("/dashboard")
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      <li>Dashboard</li>
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/events/all_event"
                      className={
                        pathname.includes("/dashboard")
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      <li>Dashboard</li>
                    </Link>
                  )}
                  {status == "unauthenticated" && (
                    <Link
                      href="/login"
                      className={
                        pathname === "/login"
                          ? "text-green-600 font-medium"
                          : ""
                      }
                    >
                      <li>Login</li>
                    </Link>
                  )}
                </ul>
              </ul>
              <button onClick={handleToggle} className="absolute top-4 right-4">
                <FaTimes className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
