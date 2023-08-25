import {
  connectDatabase,
  getAllDocuments,
  getFilteredDocuments,
  insertDocument,
} from "../../../src/helpers/db-util";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {
    //   if (!itemType || !item || item.trim() === "") {
    //     res.status(422).json({ message: "Invalid input" });
    //     return;
    //   }
    //   try {
    //     await insertDocument(client, "attendance", { itemEntry: newItemEntry });
    //     client.close();
    //   } catch (error) {
    res.status(500).json({ code: 500, message: "Inserting data failed." });
    return;
    //   }
    // res.status(201).json({ message: "Item added successfully." });
    // return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getFilteredDocuments(
        client,
        "events",
        {},
        { _id: -1 }
      );
      res.status(200).json(documents);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "GET request failed." + error });
    }
  }

  client.close();
}

export default handler;
