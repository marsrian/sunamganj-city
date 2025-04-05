import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    const blogCollect = await dbConnect(collectionNameObj.blogsCollection);
    const result = await blogCollect.updateOne(
      { 
        _id: new ObjectId(id),
      },
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