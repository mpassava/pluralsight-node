import express from "express";
import debugModule from "debug";
import { ObjectId } from "mongodb";
import { closeDB, connectToDB } from "../config/db.js";
import speakerService from "../services/speakerService.js";

const sessionsRouter = express.Router();
const debug = debugModule("app:sesssionsRouter");

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});

sessionsRouter.route("/").get((req, res) => {
  (async function mongo() {
    try {
      const db = await connectToDB();
      debug("Connected to mongo DB");

      const sessions = await db.collection("sessions").find().toArray();

      res.render("sessions", { sessions });
    } catch (err) {
      debug(err.stack);
    } finally {
      await closeDB();
    }
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  (async function mongo() {
    try {
      const db = await connectToDB();
      debug("Connected to mongo DB");

      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });

      const speaker = await speakerService.getSpeakerById(
        session.speakers[0].id
      );

      session.speaker = speaker.data;
      res.render("session", { session });
    } catch (err) {
      debug(err.stack);
    } finally {
      await closeDB();
    }
  })();
});

export default sessionsRouter;
