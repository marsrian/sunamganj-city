import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (res, { params }) => {
  const p = await params;
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email });

    if (user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const result = await userCollection.findOne({ _id: new ObjectId(p.id) });
    return NextResponse.json(result);
  }
  return NextResponse.redirect(new URL("/login", req.url));
};

export const PATCH = async (req, { params }) => {
  const p = await params;
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const query = { _id: new ObjectId(p.id) };
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email });

    if (user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    // const result = await userCollection.findOne(query);

    const body = await req.json();
    const filter = {
      $set: {
        ...body,
      },
    };
    const option = { upsert: true };

    const updatedUser = await userCollection.updateOne(query, filter, option);
    revalidatePath("/dashboard");
    return NextResponse.json(updatedUser, { status: 200 });
  }
  return NextResponse.redirect(new URL("/login", req.url));
};
