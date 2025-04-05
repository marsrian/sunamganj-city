import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const secureCookie = process.env.NODE_ENV === "production" ? true : false;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // For admin routes, check if user is admin
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (
      token.role !== "admin" &&
      token.role !== "writer" &&
      token.role !== "manager"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/about/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
