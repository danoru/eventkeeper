import {
  connectDatabase,
  getFilteredDocuments,
} from "../../../src/helpers/db-util";

async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {
    res.status(500).json({ message: "Inserting data failed." });
    return;
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
      res.status(500).json({ message: "GET request failed." + error });
    }
  }

  client.close();
}

export default handler;
