import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../services/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  switch (req.method.toUpperCase()) {
    case "GET": {
      try {
        const documents = await getAllDocuments(client, "comments", {
          _id: -1,
        });
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: "Getting comments failed." });
      }
      break;
    }
    case "POST": {
      const { email, name, text } = req.body;

      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        !text.trim() === ""
      ) {
        res.status(422).json({ messgae: "Invalid input!" });
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      let result;

      try {
        result = await insertDocument(client, "comments", newComment);

        res
          .status(201)
          .json({ message: "Added comment.", comment: newComment });
      } catch (error) {
        res.status(500).json({ message: "Inserting comment failed!" });
      }
      break;
    }
    default:
      break;
  }

  client.close();
}

export default handler;
