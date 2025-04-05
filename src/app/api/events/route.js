import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res) => {
  const eventCollect = dbConnect(collectionNameObj.eventsCollection);
  const result = await eventCollect.find({}).toArray();
  return NextResponse.json(result);
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (session?.user?.role !== "manager") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const eventCollect = dbConnect(collectionNameObj.eventsCollection);
  const result = await eventCollect.insertOne(body);
  return NextResponse.json(result);
};
