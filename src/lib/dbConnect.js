import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  usersCollection: "users",
  postsCollection: "posts",
  servicesCollection: "services",
  eventsCollection: "events",
  blogsCollection: "blogs",
  commentsCollection: "comments",
};

export default function dbConnect(collectionName) {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_Name).collection(collectionName);
}
