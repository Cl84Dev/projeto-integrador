const express = require("express");
const {
  create,
  get,
  deleteBill,
  pay,
} = require("../controllers/BillToPayController");

const billsToPayRouter = express.Router();

billsToPayRouter.post("/bill", create);
billsToPayRouter.get("/bill/:account_id", get);
billsToPayRouter.post("/pay-bill", pay);
billsToPayRouter.delete("/bill/:bill_to_pay_id", deleteBill);

module.exports = billsToPayRouter;
