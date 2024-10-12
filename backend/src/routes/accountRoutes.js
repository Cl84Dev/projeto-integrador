const express = require("express");
const {
  create,
  getOne,
  getByAccountNumber,
} = require("../controllers/AccountController");

const accountRouter = express.Router();

accountRouter.post("/account", create);
accountRouter.get("/account", getOne);
accountRouter.get("/account/:account_number", getByAccountNumber);

module.exports = accountRouter;
