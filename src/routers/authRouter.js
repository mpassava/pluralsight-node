import express from "express";
import debugModule from "debug";
import { closeDB, connectToDB } from "../config/db.js";
import passport from "passport";

const authRouter = express.Router();
const debug = debugModule("app:authRouter");

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;

  (async function addUser() {
    try {
      const db = await connectToDB();
      const user = { username, password };
      const result = await db.collection("users").insertOne(user);
      debug(result);

      req.login(result, () => {
        res.redirect("/auth/profile");
      });
    } catch (err) {
      debug(err);
    } finally {
      await closeDB();
    }
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/'
  }));

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

export default authRouter;
