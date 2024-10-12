const Account = require("../models/Account");

const create = async (req, res) => {
  const body = req.body;

  try {
    const account = await Account.create(body);
    console.log(account);
    res.status(201).json({ message: "Account created successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getOne = async (req, res) => {
  const cpf = req.user;
  try {
    const account = await Account.getOne(cpf);
    res.status(200).json({ message: "Got account data successfuly!", account });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getByAccountNumber = async (req, res) => {
  const { account_number } = req.params;
  try {
    const accounts = await Account.getByAccountNumber(account_number);
    res
      .status(200)
      .json({ message: "Got account data successfuly!", accounts });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { create, getOne, getByAccountNumber };
