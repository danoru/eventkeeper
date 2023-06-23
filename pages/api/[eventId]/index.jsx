import {
  connectDatabase,
  getFilteredDocuments,
  insertDocument,
} from "../../../src/helpers/db-util";

async function handler(req, res) {
  let client;

  let eventId = req.query.eventId;

  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const location = req.body.location;
  const date = req.body.date;
  const image = req.body.image;
  const flyer = req.body.image;
  const isFeatured = req.body.isFeatured;
  const isGuestOnly = req.body.isGuestOnly;

  const newEvent = {
    id,
    title,
    description,
    location,
    date,
    image,
    flyer,
    isFeatured,
    isGuestOnly,
  };

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
  } else if (req.method === "POST") {
    if (
      id.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      location.trim() === "" ||
      date.trim() === "" ||
      image.trim() === "" ||
      flyer.trim() === "" ||
      isFeatured.trim() === "" ||
      isGuestOnly.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    try {
      await insertDocument(client, "events", { newEvent });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "POST request failed." + error });
    }
  } else {
    res.status(500).json({ message: "Invalid request." });
    return;
  }

  client.close();
}

export default handler;
