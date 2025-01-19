import { MongoClient, Db } from 'mongodb';

// Extend the global interface to include the custom property
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI; // Store this in .env.local

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the MongoDB connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to use the client directly
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;

export const getDb = async (): Promise<Db> => {
  const client = await clientPromise;
  return client.db("social-clout-db");
};