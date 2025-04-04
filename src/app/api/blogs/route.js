import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res) => {
  const blogCollect = dbConnect(collectionNameObj.blogsCollection);
  const result = await blogCollect.find({}).toArray();
  return NextResponse.json(result);
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (session?.user?.role !== "admin" && session?.user?.role !== "writer") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const blogCollect = dbConnect(collectionNameObj.blogsCollection);
  const result = await blogCollect.insertOne(body);
  return NextResponse.json(result);
};
