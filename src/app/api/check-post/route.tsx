import connectDB from "@/db/connection";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  let client: MongoClient | null = null;
  const { profileUrl } = await req.json();

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const postCollection = db.collection("posts");
    const userNameExist = await postCollection.findOne({ profileUrl });

    if (userNameExist) {
      return NextResponse.json({ success: true, message: "username already exist" }, { status: 200 });
    }
    else {
      return NextResponse.json({ success: false, message: "username not exist" }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error saving data into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 });
  }
}