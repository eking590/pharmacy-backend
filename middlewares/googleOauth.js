import passport from "passport"; 
import { Strategy } from "passport-google-oauth20";
//insert the google strategy here 
//import { Profile } from "passport-google-oauth20";
import User from "../models/user.js";
//insert your db here 

export const googleStrategy = async (req, res, next) => {
  const GoogleStrategy = Strategy;

  passport.use(
    new GoogleStrategy(
      {
        clientID: "655597420673-5g6a25cjf0uespi4i63t46mab1vu2ork.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:2000/api/v1/auth/google/callback",
        passReqToCallback: true,
        scope: ["profile", "email"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the database
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Create a new user in the database if they haven't logged in before
            user = new User({
              googleId: profile.id,
              email: profile.emails[0].value,
              // Add any other relevant user data from the profile
            });
            await user.save();
          }

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};


  



