import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import model from "../models/index.js"; // 假設 user 是在 models 中具名導出
import dotenv from "dotenv";

dotenv.config();
const User = model.User;

const configurePassport = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.PASSPORT_SECRET,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          return done(null, foundUser); // 把 req.user = foundUser
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};

export default configurePassport;
