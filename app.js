import express from "express";
import chalk from "chalk";
import debugModule from "debug";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passportConfig from "./src/config/passport.js";
import { adminRouter, sessionsRouter, authRouter } from "./src/routers/index.js";

const PORT = process.env.PORT || 3000;
const debug = debugModule("app");
const app = express();

app.use(morgan("tiny"));
app.use(express.static(`${import.meta.dirname}/public/`));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'globomantics',
  resave: true,
  saveUninitialized: true
}));

passportConfig(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use('/auth', authRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(PORT, () => {
  debug(`listening on port ${chalk.green(PORT)}`);
});
