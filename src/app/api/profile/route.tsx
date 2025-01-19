import connectDB from "@/db/connection";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  let client: MongoClient | null = null;
  const { profileUrl } = await req.json();

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const profileCollection = db.collection("profiles");

    const profileUrlArray = profileUrl.map((profile: string) => ({
      profile,
      createdAt: new Date()
    }))

    const result = await profileCollection.insertMany(profileUrlArray);

    if (result) {
      return NextResponse.json({ success: true, message: "Success" }, { status: 201 });
    }
    else {
      return NextResponse.json({ success: false, message: "Failed" }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error saving profiles into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 })
  }
}

export async function GET() {
  let client: MongoClient | null = null;

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const profileCollection = db.collection("profiles");

    const result = await profileCollection.find({}).toArray();

    if (result) {
      return NextResponse.json({ success: true, message: "Success", data: result }, { status: 200 });
    }
    else {
      return NextResponse.json({ success: false, message: "Failed" }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error saving profiles into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {

  let client: MongoClient | null = null;
  const { profileUrl } = await req.json();

  try {
    client = await connectDB;
    const db = client.db("social-clout-db");
    const profileCollection = db.collection("profiles");
    const deleteProfile = await profileCollection.findOneAndDelete({ profile: profileUrl });

    if (deleteProfile) {
      return NextResponse.json({ success: true, message: "success" }, { status: 200 });
    }
    else {
      return NextResponse.json({ success: false, message: "failed" }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error deleting profile into db:', error.message);
    return NextResponse.json({ success: false, message: "Failed", error: error.message }, { status: 500 });
  }
}