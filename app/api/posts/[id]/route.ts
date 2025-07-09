import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/posts/[id] - Get a post by _id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  try {
    const db = await getDb();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching post", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] - Update a post by _id
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  try {
    const db = await getDb();
    const data = await req.json();
    delete data._id;
    const result = await db.collection("posts").updateOne({ _id: new ObjectId(id) }, { $set: data });
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating post", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - Delete a post by _id
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  try {
    const db = await getDb();
    const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ deletedCount: result.deletedCount });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting post", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
