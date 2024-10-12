const express = require("express");
const { get, transfer } = require("../controllers/TransactionController");

const transactionRouter = express.Router();

transactionRouter.get("/transaction/:account_id", get);
transactionRouter.post("/transaction", transfer);

module.exports = transactionRouter;
