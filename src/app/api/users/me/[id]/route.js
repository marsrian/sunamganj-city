import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    const userCollect = await dbConnect(collectionNameObj.usersCollection);
    const result = await userCollect.updateOne(
      {
        _id: new ObjectId(id),
        email: session?.user?.email,
      },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Forbidden - You are not the author of this profile" },
        { status: 403 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
