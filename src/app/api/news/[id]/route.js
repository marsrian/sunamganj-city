import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {
  const p = await params;
  const query = { _id: new ObjectId(p.id) };
  const newsCollect = dbConnect(collectionNameObj.newsCollection);
  const news = await newsCollect.findOne(query);
  if (!news) {
    return res.status(404).json({ message: "Service not found" });
  }
  return NextResponse.json(news);
};