import passport from "passport";
import { Strategy } from "passport-local";

export default function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'username',
    password: 'password'
  }, (username, password, done) => {
    const user = {username, password, 'strategy': 'local'};
    done(null, user);
  }))
}
