import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res) => {
    const serviceCollection = dbConnect(collectionNameObj.servicesCollection);
    const result = await serviceCollection.find({}).toArray();
    return NextResponse.json(result);
  };

export const POST = async (req) => {
  const body = await req.json();
  const session = await getServerSession(authOptions);
//   check admin:
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  const serviceCollection = dbConnect(collectionNameObj.servicesCollection);
  const result = await serviceCollection.insertOne(body);
  return NextResponse.json(result);
};
