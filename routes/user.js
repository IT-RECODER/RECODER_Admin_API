const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const { name, userType, clubNumber, username } = req.body;
  try {
    const exUser = await User.findOne({ where: { username } });
    if (exUser) {
      return res.send("이미 가입된 이메일입니다");
    } else {
      const password = await bcrypt.hash("1234", 12);
      User.create({
        username: username,
        password: password,
        userType: userType,
        name: name,
        clubNumber: clubNumber,
      });
      return res.status(201).send("사용자 정보 생성");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  const { name, userType, clubNumber, username } = req.body;
  try {
    const updateUser = await User.findOne({ where: { id: req.params.id } });
    if (updateUser) {
      await User.update(
        {
          username: username,
          userType: userType,
          name: name,
          clubNumber: clubNumber,
        },
        { where: { id: req.params.id } }
      );
      return res.status(201).send("사용자 정보 변경");
    } else {
      return res.send("사용자가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const updateUser = await User.findOne({ where: { id: req.params.id } });
    if (updateUser) {
      User.destroy({ where: { id: req.params.id } });
      return res.status(201).send("사용자 정보 삭제");
    } else {
      return res.send("사용자가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
