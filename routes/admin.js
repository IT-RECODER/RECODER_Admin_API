const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Admin } = require('../models');
const router = express.Router();

router.post('/signup', isNotLoggedIn, async (req, res) => {
  const { name, userType, clubNumber, username, password } = req.body;
  try {
    const exUser = await Admin.findOne({ where: { username } });
    if (exUser) {
      return res.send('이미 가입된 이메일입니다');
    }
    const hash = await bcrypt.hash(password, 12);
    await Admin.create({
      username: username,
      password: hash,
      userType: userType,
      name: name,
      clubNumber: clubNumber,
    });
    return res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.log(authError);
      return next(authError);
    }
    if (!user) {
      return res.send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send(`${user.name} 로그인`);
    });
  })(req, res, next);
});

module.exports = router;
