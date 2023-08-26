import { MongoClient } from "mongodb";

import {
  // connectDatabase,
  // getAllDocuments,
  getFilteredDocuments,
  // insertDocument,
} from "../../../src/helpers/db-util";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // let client;

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    // client = await connectDatabase();

    // if (req.method === "POST") {
    //   res.status(500).json({ code: 500, message: "Inserting data not allowed." });
    //   // return;
    // } else
    if (req.method === "GET") {
      // try {
      const documents = await getFilteredDocuments(
        client,
        "events",
        { isFeatured: true },
        { _id: -1 }
      );
      res.status(200).json(documents);
      // } catch (error) {
      //   res
      //     .status(500)
      //     .json({ code: 500, message: "GET request failed." + error });
      // }
    } else {
      res.status(400).json({ code: 400, message: "Invalid request." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, message: "Connecting to the database failed." });
    // return;
  } finally {
    client.close();
  }
  // }

  // client.close();
}

export default handler;
