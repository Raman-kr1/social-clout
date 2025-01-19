import connectDB from "@/db/connection";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  let client: MongoClient | null = null;
  const { data, profileUrl } = await req.json();

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const postCollection = db.collection("posts");

    const result = await postCollection.insertOne({ ...data, profileUrl, createdAt: new Date() });
    if (result) {
      return NextResponse.json({ success: true, message: "Success" }, { status: 201 });
    }
    else {
      return NextResponse.json({ success: false, message: "Failed" }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error saving data into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 })
  }
}