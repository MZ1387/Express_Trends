const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;
const keys = require('../config/keys');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new InstagramStrategy({
    clientID: keys.instagramClientID,
    clientSecret: keys.instagramClientSecret,
    callbackURL: "http://localhost:3000/auth/instagram/return"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      const { id, username, profile_picture, full_name, counts, bio } = profile._json.data
      const user = {
        id,
        profile_picture,
        username,
        full_name,
        bio
      }
      console.log('USER PROFILE', profile);
      return done(null, profile);
    });
  }
));
