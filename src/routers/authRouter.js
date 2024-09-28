import express from "express";
import debugModule from "debug";
import { closeDB, connectToDB } from "../config/db.js";

const authRouter = express.Router();
const debug = debugModule("app:authRouter");

authRouter.route("/signUp").post((req, res) => {
  //TODO create user
  req.login(req.body, () => {
    res.redirect("/auth/profile");
  });
});

authRouter.route('/profile').get((req, res) => {
  res.json(req.user);
})

export default authRouter;
