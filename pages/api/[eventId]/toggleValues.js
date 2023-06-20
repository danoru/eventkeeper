import { connectDatabase, updateDocument } from "../../../src/helpers/db-util";

async function handler(req, res) {
  let client;

  const id = req.body.id;
  const isGuestOnly = req.body.isGuestOnly;
  const isFeatured = req.body.isFeatured;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed." });
    return;
  }
  if (req.method === "PUT") {
    try {
      await updateDocument(
        client,
        "events",
        { id: id },
        { $set: { isGuestOnly: isGuestOnly } }
      );
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Updating data failed." });
      return;
    }
    res.status(201).json({ message: "Item updated successfully." });
    return;
  } else {
    res.status(400).json({ message: "Invalid request method." });
  }
  client.close();
}

export default handler;
