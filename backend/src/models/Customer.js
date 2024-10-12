const connection = require("../config");
const { hashPassword, verifyPassword } = require("../helpers/hashPassword");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "jsdhfkjsdhf67sdf6s8dfsjh";

class Customer {
  static async create(body) {
    const { name, cpf, password } = body;

    if (!name || !cpf || !password) {
      return Promise.reject("Missing required fields: name, cpf, password");
    }

    const hashedPassword = await hashPassword(password);

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO customers (name, cpf, password) VALUES(?, ?, ?)";
      connection.query(query, [name, cpf, hashedPassword], (err, result) => {
        if (err) return reject(err.sqlMessage);
        resolve(result);
      });
    });
  }

  static async authenticate(body) {
    const { cpf, password } = body;

    return new Promise((resolve, reject) => {
      if (!cpf || !password) {
        return reject("Missing required fields: cpf, password");
      }

      const query =
        "SELECT password, cpf, customer_id, name FROM customers WHERE cpf = ? ";
      connection.query(query, [cpf], async (err, result) => {
        if (err) return reject(err.sqlMessage);

        if (!result[0]) {
          return reject("Invalid credentials.");
        }

        await verifyPassword(password, result[0].password)
          .then((response) => {
            if (response) {
              const token = jwt.sign({ cpf }, SECRET_KEY, { expiresIn: "1h" });
              const { name, customer_id } = result[0];
              return resolve({ token, name, customer_id });
            } else {
              return reject("Invalid credentials.");
            }
          })
          .catch((err) => reject(err));
      });
    });
  }
}

module.exports = Customer;
