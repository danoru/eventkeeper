import { connectDatabase, insertDocument } from "../../helpers/db-util";

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
    return;
  }

  if (req.method === "GET") {
    const dummyList = { itemType: "main-dish", item: "Paprikash" };
    res.status(200).json({ itemEntry: dummyList });
  } else {
    res.status(500).json({ message: "Invalid request." });
  }
}

export default handler;
