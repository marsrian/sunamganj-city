import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {
  const p = await params;
  const query = { _id: new ObjectId(p.id) };
  const serviceCollection = dbConnect(collectionNameObj.servicesCollection);
  const service = await serviceCollection.findOne(query);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }
  return NextResponse.json(service);
};
