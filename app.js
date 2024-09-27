import express from "express";
import chalk from "chalk";
import debugModule from "debug";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const debug = debugModule("app");
const app = express();

app.use(morgan("tiny"));
app.use(express.static(`${import.meta.dirname}/public/`));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
