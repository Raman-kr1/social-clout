import connectDB from "@/db/connection";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const { profileUrls } = await req.json();
  let client: MongoClient | null = null;

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const postCollection = db.collection("posts");

    if (profileUrls.length > 0) {
      const result = await postCollection.find({ profileUrl: { $in: profileUrls } }).project({ elements: { $slice: [0, 20] }, _id: 0 }).toArray()

      if (result) {
        return NextResponse.json({ success: true, message: "Success", data: result }, { status: 200 });
      }
      else {
        return NextResponse.json({ success: false, message: "Failed" }, { status: 400 });
      }
    }
    else {
      return NextResponse.json({ success: false, message: "Please provide profile url" }, { status: 404 });
    }


  } catch (error: any) {
    console.error('Error finding profiles from db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 })
  }
}