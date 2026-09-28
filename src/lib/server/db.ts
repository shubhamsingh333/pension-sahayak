import "server-only";
import { MongoClient } from "mongodb";
const globalMongo = globalThis as unknown as {
  pensionMongo?: Promise<MongoClient>;
};
export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured");
  if (!globalMongo.pensionMongo) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    globalMongo.pensionMongo = client
      .connect()
      .catch(async (error: unknown) => {
        globalMongo.pensionMongo = undefined;
        await client.close();
        throw error;
      });
  }
  return (await globalMongo.pensionMongo).db();
}
