import express from "express";
import debugModule from "debug";
import { closeDB, connectToDB } from "../config/db.js";

const authRouter = express.Router();
const debug = debugModule("app:authRouter");

authRouter.route('/signUp').post((req, res) => {
  res.json(req.body);
})

export default authRouter;