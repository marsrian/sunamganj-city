import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res) => {
  const newsCollect = dbConnect(collectionNameObj.newsCollection);
  const result = await newsCollect.find({}).toArray();
  return NextResponse.json(result);
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const body = await req.json();
  // check admin
  if (session?.user?.role !== "admin") {
    return NextResponse.json(
      { message: "You are not allowed to access this" },
      { status: 403 }
    );
  }

  const newsCollect = dbConnect(collectionNameObj.newsCollection);
  const result = await newsCollect.insertOne(body);
  return NextResponse.json(result);
};
