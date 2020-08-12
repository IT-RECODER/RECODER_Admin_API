const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { name, userType, clubNumber, username } = req.body;
  try {
    const exUser = await User.findOne({ where: { username } });
    if (exUser) {
      return res.send('이미 가입된 이메일입니다');
    }
    const password = await bcrypt.hash('1234', 12);
    User.create({
      username: username,
      password: password,
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

module.exports = router;
