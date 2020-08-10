const express = require('express');
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();

const userRouter = require('./routes/user');
const { sequelize } = require("./models");

sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/users", userRouter);

app.listen(3000, () => {
    console.log("서버 시작");
});