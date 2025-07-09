import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const posts = await db.collection("posts").find({}).toArray();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error fetching posts",
        details: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(req: NextRequest) {
  try {
    const db = await getDb();
    const data = await req.json();
    // Clean data: trim strings, remove leading spaces
    const cleaned = {
      ...data,
      title: data.title?.trim(),
      author: data.author?.trim(),
      content: data.content?.trim(),
      excerpt: data.excerpt?.trim(),
      coverImage: data.coverImage?.url ? { url: data.coverImage.url.trim() } : undefined,
      coverVideo: data.coverVideo?.url ? { url: data.coverVideo.url.trim() } : undefined,
      date: new Date(),
    };
    const result = await db.collection("posts").insertOne(cleaned);
    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
