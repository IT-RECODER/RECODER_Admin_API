const local = require('./localStrategy');
const { Admin } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findOne({
      attributes: ['username', 'userType', 'name', 'clubNumber'],
      where: { id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local(passport);
};
