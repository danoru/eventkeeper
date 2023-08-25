import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = new MongoClient.connect(process.env.MONGODB_URI);

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function updateDocument(client, collection, filter, document) {
  const db = client.db();

  const result = await db.collection(collection).updateOne(filter, document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getFilteredDocuments(client, collection, find, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();

  return documents;
}
