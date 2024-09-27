import express from "express";
import chalk from "chalk";
import debugModule from "debug";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const debug = debugModule("app");
const app = express();
const sessionRouter = express.Router();

app.use(morgan("tiny"));
app.use(express.static(`${import.meta.dirname}/public/`));

app.set("views", "./src/views");
app.set("view engine", "ejs");

sessionRouter.route("/").get((req, res) => {
  res.render("sessions", {
    sessions: [
      { title: "Session 1", description: "This is session 1" },
      { title: "Session 2", description: "This is session 2" },
      { title: "Session 3", description: "This is session 3" },
      { title: "Session 4", description: "This is session 4" },
    ],
  });
});

sessionRouter.route("/1").get((req, res) => {
  res.send("hello single session");
});

app.use("/sessions", sessionRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
