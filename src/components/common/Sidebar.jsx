"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <ul className="border">
      {user?.role === "admin" && (
        <>
          <li className="border-b p-3">
            <Link
              href="/dashboard/members"
              className={
                pathname.includes("/dashboard/members") ? "text-green-600" : ""
              }
            >
              Members
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/services/add_service"
              className={
                pathname === "/dashboard/services/add_service"
                  ? "text-green-600"
                  : ""
              }
            >
              Add Service
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/services/services_all"
              className={
                pathname.includes("/dashboard/services/services_all")
                  ? "text-green-600"
                  : ""
              }
            >
              Show All Service
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/services/approval_service"
              className={
                pathname.includes("/dashboard/services/approval_service")
                  ? "text-green-600"
                  : ""
              }
            >
              Approval Service
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/events/approval_event"
              className={
                pathname.includes("/dashboard/events/approval_event")
                  ? "text-green-600"
                  : ""
              }
            >
              Approval Event
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/blogs/approval_blog"
              className={
                pathname.includes("/dashboard/blogs/approval_blog")
                  ? "text-green-600"
                  : ""
              }
            >
              Approval Blog
            </Link>
          </li>
        </>
      )}
      {user?.role === "manager" && (
        <>
          <li className="border-b p-3">
            <Link
              href="/dashboard/events/all_event"
              className={
                pathname.includes("/dashboard/events/all_event")
                  ? "text-green-600"
                  : ""
              }
            >
              Show All Event
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/events/add_event"
              className={
                pathname === "/dashboard/events/add_event"
                  ? "text-green-600"
                  : ""
              }
            >
              Add Event
            </Link>
          </li>
        </>
      )}
      {user?.role === "writer" && (
        <>
          <li className="border-b p-3">
            <Link
              href="/dashboard/blogs/add_blog"
              className={
                pathname === "/dashboard/blogs/add_blog" ? "text-green-600" : ""
              }
            >
              Add Blog
            </Link>
          </li>
          <li className="border-b p-3">
            <Link
              href="/dashboard/blogs/all_blog"
              className={
                pathname.includes("/dashboard/blogs/all_blog") ? "text-green-600" : ""
              }
            >
              Show All Blog
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default Sidebar;
