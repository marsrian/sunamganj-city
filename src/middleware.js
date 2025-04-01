// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export const middleware = async (req) => {
//   const token = await getToken({ req });
//   secureCookie: process.env.Node === "production" ? true : false;
//   if (token) {
//     return NextResponse.next();
//   } else {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// };

// export const config = {
//   matcher: ["/about/:path*", "/dashboard", "/dashboard/:path*"],
// };

// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({ req });
  const secureCookie = process.env.NODE_ENV === "production" ? true : false;
  
  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // For admin routes, check if user is admin
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    // You might need to fetch the user's role from your database here
    // or include it in the token during authentication
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not admin
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
