import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const GET = async (res, { params }) => {
  const p = await params;
  const query = { _id: new ObjectId(p.id) };
  const blogCollect = dbConnect(collectionNameObj.blogsCollection);
  const blog = await blogCollect.findOne(query);
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(blog);
};

export const PATCH = async (req, { params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    // Prevent updating writer_email even if included in the request
    delete body.writer_email;

    const blogCollect = await dbConnect(collectionNameObj.blogsCollection);
    const result = await blogCollect.updateOne(
      { 
        _id: new ObjectId(id),
        writer_email: session.user.email // Only match documents where writer matches current user
      },
      { $set: body }
    );

    // If no document was matched, user is not authorized
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
