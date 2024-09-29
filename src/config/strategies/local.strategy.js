import passport from "passport";
import { Strategy } from "passport-local";
import { closeDB, connectToDB } from "../db.js";
import debugModule from "debug";

const debug = debugModule("app:auth");

export default function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        password: "password",
      },
      (username, password, done) => {
        (async function validateUser() {
          try {
            const db = await connectToDB();
            debug("Connected to mongo DB");

            const user = await db.collection("users").findOne({ username });

            if (user && user.password === password) {
              debug("User validated");
              done(null, user);
            } else {
              debug("User not found");
              done(null, false);
            }
          } catch (err) {
            done(err, false);
          } finally {
            await closeDB();
          }
        })();
      }
    )
  );
}
