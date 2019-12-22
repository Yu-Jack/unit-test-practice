const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const fileController = require("./fileController")

const authController = require("./authController")
app.post("/login", authController.run);
app.post("/file", fileController.run);

// 給 /login 用的, 不在測試範圍內
app.post("/api", (req, res) => {
    res.json({status: req.body.username === "123" ? 0 : 1})
})

app.listen(7070)