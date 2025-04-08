import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const secureCookie = process.env.NODE_ENV === "production" ? true : false;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // For admin, manager, writer routes check:
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (
      token.role !== "admin" &&
      token.role !== "writer" &&
      token.role !== "manager"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // For admin routes check:
  if (
    req.nextUrl.pathname.startsWith("/dashboard/members") ||
    req.nextUrl.pathname.startsWith("/dashboard/services") ||
    req.nextUrl.pathname.startsWith("/dashboard/events/approval_event") ||
    req.nextUrl.pathname.startsWith("/dashboard/blogs/approval_blog")
  ) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // For writer routes check:
  if (
    req.nextUrl.pathname.startsWith("/dashboard/blogs/add_blog") ||
    req.nextUrl.pathname.startsWith("/dashboard/blogs/all_blog")
  ) {
    if (token.role !== "writer") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // For manager routes check:
  if (
    req.nextUrl.pathname.startsWith("/dashboard/events/all_event") ||
    req.nextUrl.pathname.startsWith("/dashboard/events/add_event")
  ) {
    if (token.role !== "manager") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  // For user routes check:
  if (req.nextUrl.pathname.startsWith("/profile")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/profile", "/dashboard", "/dashboard/:path*"],
};
