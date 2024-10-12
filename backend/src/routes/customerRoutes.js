const express = require("express");
const { signup, authenticate } = require("../controllers/CustomerController");

const customerRouter = express.Router();

customerRouter.post("/signup", signup);

customerRouter.post("/authenticate", authenticate);

module.exports = customerRouter;
