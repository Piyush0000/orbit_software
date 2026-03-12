const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { prisma } = require('../config/database');
const env = require('../config/env');

if (env.google.clientId && env.google.clientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.google.clientId,
        clientSecret: env.google.clientSecret,
        callbackURL: env.google.callbackUrl,
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error('No email from Google profile'));

        // UPSERT strategy: Link by Google ID or by Email
        let user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: profile.id },
              { email }
            ]
          }
        });

        if (user) {
          // If user exists by email but doesn't have googleId linked, link it now
          if (!user.googleId) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { googleId: profile.id, emailVerified: true }
            });
          }
          return done(null, user);
        }

        // New user creation
        const newUser = await prisma.user.create({
          data: {
            email,
            googleId: profile.id,
            fullName: profile.displayName || 'Google User',
            role: 'MERCHANT',
            emailVerified: true,
            isActive: true
          }
        });

        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
}

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
