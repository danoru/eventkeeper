import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI!);

  return client.connect();
}

export async function insertDocument(
  client: MongoClient,
  collection: any,
  document: any
) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function updateDocument(
  client: MongoClient,
  collection: any,
  filter: any,
  document: any
) {
  const db = client.db();

  const result = await db.collection(collection).updateOne(filter, document);

  return result;
}

export async function getAllDocuments(
  client: MongoClient,
  collection: any,
  sort: any
) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getFilteredDocuments(
  client: MongoClient,
  collection: any,
  find: any,
  sort: any
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();

  return documents;
}
