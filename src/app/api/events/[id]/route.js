import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {
  const p = await params;
  const query = { _id: new ObjectId(p.id) };
  const eventCollect = dbConnect(collectionNameObj.eventsCollection);
  const news = await eventCollect.findOne(query);
  if (!news) {
    return res.status(404).json({ message: "Service not found" });
  }
  return NextResponse.json(news);
};

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = params;
    const body = await req.json();

    // Prevent updating manager_email even if included in the request
    delete body.manager_email;

    const eventCollect = await dbConnect(collectionNameObj.eventsCollection);
    const result = await eventCollect.updateOne(
      { _id: new ObjectId(id), manager_email: session.user.email },
      { $set: body }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Forbidden - You are not the writer of this blog" },
        { status: 403 }
      );
    }
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
