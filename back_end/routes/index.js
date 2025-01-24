const express = require("express");
const router = express.Router();

const userRouter = require('./user');
const birdRouter = require("./bird")

router.use("/users",userRouter);
router.use("/birds",birdRouter);


module.exports = router;