const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let usuario = await Usuario.findOne({ email: profile.emails[0].value });
    
    if (!usuario) {
      usuario = await Usuario.create({
        nombre: profile.displayName,
        email: profile.emails[0].value,
        password: 'google-oauth'
      });
    }
    
    return done(null, usuario);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  Usuario.findById(id, (err, user) => done(err, user));
});

module.exports = passport;