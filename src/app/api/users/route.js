import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (res) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email });

    if(user?.role !== 'admin') {
      return NextResponse.json({ message: "Forbidden" }, {status: 403});
    }

    const result = await userCollection.find({}).toArray();
    return NextResponse.json(result);
  }
  return NextResponse.redirect(new URL("/login", req.url));
};
