const Customer = require("../models/Customer");

const signup = async (req, res) => {
  const body = req.body;

  try {
    const customer = await Customer.create(body);
    console.log(customer);
    res.status(201).json({ message: "User created successfuly!" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const authenticate = async (req, res) => {
  const body = req.body;

  try {
    const { token, name, customer_id } = await Customer.authenticate(body);
    res
      .status(200)
      .json({
        message: "User authenticated successfuly!",
        token,
        name,
        customer_id,
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = { signup, authenticate };
