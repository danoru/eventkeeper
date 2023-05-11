import {
  connectDatabase,
  getFilteredDocuments,
} from "../../../src/helpers/db-util";

async function handler(req, res) {
  let client;

  let eventId = req.query.eventId;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "GET") {
    try {
      const documents = await getFilteredDocuments(
        client,
        "events",
        { id: eventId },
        { _id: -1 }
      );
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ message: "GET request failed." + error });
    }
  } else {
    res.status(500).json({ message: "Only GET requests are permitted." });
    return;
  }

  client.close();
}

export default handler;
