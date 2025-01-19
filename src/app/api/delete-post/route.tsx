import connectDB from "@/db/connection";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {

  let client: MongoClient | null = null;
  const { profileUrl } = await req.json();

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const postCollection = db.collection("posts");
    const deletePost = await postCollection.deleteOne({ profileUrl });

    if (deletePost) {
      return NextResponse.json({ success: true, message: "success" }, { status: 200 });
    }
    else {
      return NextResponse.json({ success: false, message: "failed" }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error deleting data into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 });
  }
}