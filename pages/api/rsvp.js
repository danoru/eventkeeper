import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const item = req.body.item;
    const itemType = req.body.itemType;

    const newItemEntry = {
      itemType: itemType,
      item: item,
    };

    if (!itemType || !item || item.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }

    try {
      await insertDocument(client, "attendance", { itemEntry: newItemEntry });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." });
      return;
    }
    res.status(201).json({ message: "Item added successfully." });
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "attendance", sort);
      res.status(200).json({ attendance: documents });
    } catch (error) {
      res.status(500).json({ message: "GET request failed." });
    }
  }

  client.close();
}

export default handler;
