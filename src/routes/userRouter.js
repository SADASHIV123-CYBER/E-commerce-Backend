const createUser = require("../controller/userController");

const express = require('express');

const userRouter = express.Router()

userRouter.post('/', createUser);

module.exports = userRouter