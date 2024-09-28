import express from "express";
import debugModule from "debug";
import { MongoClient, ServerApiVersion } from "mongodb";

const sessionsRouter = express.Router();
const debug = debugModule("app:sesssionsRouter");

sessionsRouter.route("/").get((req, res) => {
  const uri = `mongodb+srv://mpassava:${process.env.DB_PASS}@globomantics.lysj1.mongodb.net/?retryWrites=true&w=majority&appName=Globomantics`;
  const dbName = "globomantics";

  (async function mongo() {
    let client;
    try {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
      debug("Connected to mongo DB");

      const db = client.db(dbName);

      const sessions = await db.collection("sessions").find().toArray();

      res.render("sessions", { sessions });
    } catch (err) {
      debug(err.stack);
    } finally {
      await client.close();
    }
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  res.render("session", {
    session: sessions[id],
  });
});

export default sessionsRouter;
