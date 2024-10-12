const BillToPay = require("../models/BillToPay");

const create = async (req, res) => {
  const body = req.body;

  try {
    const account = await BillToPay.create(body);
    console.log(account);
    res.status(201).json({ message: "Bill added successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const get = async (req, res) => {
  const { account_id } = req.params;

  try {
    const bills = await BillToPay.get(account_id);
    res.status(200).json({ message: "Got bills successfuly!", bills });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const pay = async (req, res) => {
  const body = req.body;

  try {
    const bill = await BillToPay.pay(body);
    console.log(bill);
    res.status(200).json({ message: "Bill paid successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const deleteBill = async (req, res) => {
  const { bill_to_pay_id } = req.params;

  try {
    const bill = await BillToPay.deleteBill(bill_to_pay_id);
    console.log(bill);
    res.status(200).json({ message: "Bill deleted successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { create, get, deleteBill, pay };
