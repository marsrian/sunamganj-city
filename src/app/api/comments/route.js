import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export const GET = async (req, { params }) => {
  try {
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get('blogId');
    
    if (!blogId) {
      return NextResponse.json({ message: "Blog ID is required" }, { status: 400 });
    }

    const commentsCollect = dbConnect(collectionNameObj.commentsCollection);
    const comments = await commentsCollect.find({ blogId: new ObjectId(blogId) }).toArray();
    
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { blogId, content } = body;

    if (!blogId || !content) {
      return NextResponse.json({ message: "Blog ID and content are required" }, { status: 400 });
    }

    const commentsCollect = dbConnect(collectionNameObj.commentsCollection);
    const newComment = {
      blogId: new ObjectId(blogId),
      // userId: new ObjectId(session.user.id),
      userEmail: session.user.email,
      userName: session.user.name,
      userImage: session.user.image,
      content,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await commentsCollect.insertOne(newComment);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};