import { MongoClient } from "mongodb";

import {
  // connectDatabase,
  updateDocument,
} from "../../../src/helpers/db-util";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(process.env.MONGODB_URI!);
  // let client;

  const id = req.body.id;
  const isGuestOnly = req.body.isGuestOnly;
  const isFeatured = req.body.isFeatured;

  try {
    await client.connect();
    // client = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Connecting to the database failed." });
    return;
  }
  if (req.method === "PUT") {
    try {
      if (isGuestOnly) {
        await updateDocument(
          client,
          "events",
          { id: id },
          { $set: { isGuestOnly: isGuestOnly } }
        );
        client.close();
      } else if (isFeatured) {
        await updateDocument(
          client,
          "events",
          { id: id },
          { $set: { isFeatured: isFeatured } }
        );
        client.close();
      }
    } catch (error) {
      res.status(500).json({ code: 500, message: "Updating data failed." });
      return;
    }
    res.status(201).json({ code: 201, message: "Item updated successfully." });
    return;
  } else {
    res.status(400).json({ code: 400, message: "Invalid request method." });
  }
  client.close();
}

export default handler;
