import "server-only";
import { randomUUID } from "node:crypto";
import type { GrievanceInput } from "@/lib/validation";
import { getDatabase } from "./db";
interface GrievanceRecord extends GrievanceInput {
  reference: string;
  status: "Received";
  createdAt: Date;
}
export async function createGrievance(input: GrievanceInput) {
  const db = await getDatabase();
  const collection = db.collection<GrievanceRecord>("grievances");
  await collection.createIndex({ reference: 1 }, { unique: true });
  const record: GrievanceRecord = {
    ...input,
    reference: "PS-" + randomUUID().replaceAll("-", "").toUpperCase(),
    status: "Received",
    createdAt: new Date(),
  };
  await collection.insertOne(record);
  return {
    reference: record.reference,
    status: record.status,
    createdAt: record.createdAt.toISOString(),
    demo: true,
  };
}
export async function findGrievance(reference: string) {
  const db = await getDatabase();
  return db
    .collection<GrievanceRecord>("grievances")
    .findOne(
      { reference },
      {
        projection: {
          _id: 0,
          reference: 1,
          status: 1,
          createdAt: 1,
          category: 1,
        },
      },
    );
}
