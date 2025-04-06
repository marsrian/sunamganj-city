import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {
  const p = await params;
  const session = await getServerSession(authOptions);
  const query = { _id: new ObjectId(p.id) };
  if (session) {
    const email = session?.user?.email;
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email });
    if (user) {
      const result = await userCollection.findOne(query);
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  }
  return NextResponse.redirect(new URL("/login", req.url));
};
