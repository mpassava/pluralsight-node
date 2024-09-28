import express from "express";
import debugModule from "debug";
import { MongoClient, ServerApiVersion } from "mongodb";
import sessions from '../data/sessions.json' with { type: 'json' };

const adminRouter = express.Router();
const debug = debugModule("app:adminRouter");

adminRouter.route("/").get((req, res) => {
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

      const response = await db.collection('sessions').insertMany(sessions);
      res.json(response);

    } catch (err) {
      debug(err.stack);

    } finally {
      await client.close();
    }
  })();
});


export default adminRouter;
