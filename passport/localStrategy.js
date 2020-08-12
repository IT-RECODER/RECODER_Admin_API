const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { Admin } = require('../models');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const exUser = await Admin.findOne({ where: { username } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '잘못된 비밀번호입니다' });
            }
          } else {
            done(null, false, { message: '잘못된 이메일입니다' });
          }
        } catch (error) {
          console.error(error);
          next(error);
        }
      },
    ),
  );
};
