const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.PASSPORT_GOOGLE_CLIENTID}`,
      clientSecret: `${process.env.PASSPORT_GOOGLE_CLIENTSECRET}`,
      callbackURL: `${process.env.PASSPORT_GOOGLE_CALLBACKURL}`,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});
