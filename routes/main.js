const express = require('express');
const multer = require('multer');
const fs = require("fs")
const { Main } = require('../models');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + '_' + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

// main data 생성.
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const currMain = Main.findOne({ where: { id: 1 } });

    if (currMain) {
      await Main.update(
        {
          title: req.body.title,
          description: req.body.description,
          photo: req.file.filename,
        },
        {
          where: { id: 1 },
        },
      );
    } else {
      await Main.create({
        title: req.body.title,
        description: req.body.description,
        photo: req.file.filename,
      });
    }

    res.status(200).json({
      title: req.body.title,
      description: req.body.description,
      photo: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// main data 수정.
router.patch('/', upload.single('image'), async (req, res, next) => {
  try {
    await Main.update(
      {
        title: req.body.title,
        description: req.body.description,
        photo: req.body.photo,
      },
      {
        where: { id: 1 },
      },
    );

    res.status(200).json({
      title: req.body.title,
      description: req.body.description,
      photo: req.file.filename,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// main 데이터 불러오기.
router.get('/', async (req, res, next) => {
  try {
    const mainData = Main.findOne({ where: { id: 1 } });
    if (!mainData) {
      return res.status(404).send('아직 메인데이터가 없습니다.');
    }
    res.status(200).json(mainData);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
