import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

// Use a global variable to preserve the value across hot reloads in development
// @ts-expect-error: global._mongoClientPromise is not typed
if (!global._mongoClientPromise) {
  // @ts-expect-error: global._mongoClientPromise is not typed
  global._mongoClientPromise = new MongoClient(uri!, options).connect();
}
// @ts-expect-error: global._mongoClientPromise is not typed
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db();
}
