import {
  connectDatabase,
  getFilteredDocuments,
  insertDocument,
  updateDocument,
} from "../../../src/helpers/db-util";

import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }

  if (req.method === "POST") {
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
    if (
      id.trim() === "" ||
      title.trim() === "" ||
      description.trim() === "" ||
      location.trim() === "" ||
      date.trim() === "" ||
      image.trim() === "" ||
      flyer.trim() === "" ||
      typeof isFeatured !== "boolean" ||
      typeof isGuestOnly !== "boolean"
    ) {
      res.status(400).json({ code: 400, message: "Invalid request." });
      console.log(newEvent);
      return;
    }
    try {
      await insertDocument(client, "events", newEvent);
      client.close();
    } catch (error) {
      res.status(500).json({ code: 500, message: "POST request failed." });
      return;
    }
    res.status(201).json({ code: 201, message: "Event added successfully." });
    return;
  }

  if (req.method === "PUT") {
    const { updateEventId, updateEventKey, updateEventValue } = req.body;

    if (updateEventId.trim() === "" || updateEventKey.trim() === "") {
      res.status(422).json({ code: 422, message: "Invalid input." });
      console.log(req.body);
      return;
    }
    try {
      await updateDocument(
        client,
        "events",
        { id: updateEventId },
        { $set: { [updateEventKey]: updateEventValue } }
      );
      client.close();
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ code: 500, message: "PUT request failed." + error });
      return;
    }
    res.status(201).json({ code: 201, message: "Event updated successfully." });
    return;
  }

  if (req.method === "GET") {
    const eventId = req.query.eventId;
    try {
      const documents = await getFilteredDocuments(
        client,
        "events",
        { id: eventId },
        { _id: -1 }
      );
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json({ code: 500, message: "GET request failed." });
    }
  }

  client.close();
}

export default handler;
