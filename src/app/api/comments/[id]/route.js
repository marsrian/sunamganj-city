import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const DELETE = async (req, { params }) => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { id } = params;
      const commentsCollect = dbConnect(collectionNameObj.commentsCollection);
      
      // Delete only if user is the comment author
      const result = await commentsCollect.deleteOne({
        _id: new ObjectId(id),
        userEmail: session.user.email // Changed from userId to userEmail
      });
  
      if (result.deletedCount === 0) {
        return NextResponse.json(
          { message: "Comment not found or you don't have permission" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
  
  export const PATCH = async (req, { params }) => {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { id } = params;
      const body = await req.json();
      const { content } = body;
  
      if (!content) {
        return NextResponse.json(
          { message: "Content is required" },
          { status: 400 }
        );
      }
  
      const commentsCollect = dbConnect(collectionNameObj.commentsCollection);
      
      // Update only if user is the comment author
      const result = await commentsCollect.updateOne(
        {
          _id: new ObjectId(id),
          userEmail: session.user.email // Changed from userId to userEmail
        },
        { 
          $set: { 
            content,
            updatedAt: new Date() 
          } 
        }
      );
  
      if (result.matchedCount === 0) {
        return NextResponse.json(
          { message: "Comment not found or you don't have permission" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };