const Transaction = require("../models/Transaction");

const get = async (req, res) => {
  const { account_id } = req.params;

  try {
    const transactions = await Transaction.get(account_id);
    res
      .status(200)
      .json({ message: "Got transactions successfuly!", transactions });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const transfer = async (req, res) => {
  const body = req.body;

  try {
    const transactions = await Transaction.transfer(body);
    console.log(transactions);
    res.status(201).json({ message: "Transfer done successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { get, transfer };
