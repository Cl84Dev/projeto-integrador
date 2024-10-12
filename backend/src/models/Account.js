const connection = require("../config");
const generateAccountNumber = require("../helpers/generateAccountNumber");

class Account {
  static create(body) {
    const { customer_id } = body;

    if (!customer_id) {
      return Promise.reject("Missing required fields: customer_id");
    }

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO accounts (customer_id, account_number) VALUES(?, ?)";
      connection.query(
        query,
        [customer_id, generateAccountNumber()],
        (err, result) => {
          if (err) return reject(err.sqlMessage);
          resolve(result);
        }
      );
    });
  }

  static getOne({ cpf }) {
    if (!cpf) {
      return Promise.reject("Missing required field: cpf");
    }

    return new Promise((resolve, reject) => {
      const query =
        "SELECT a.account_number, a.account_id, a.balance, c.name FROM accounts a INNER JOIN customers c ON a.customer_id = c.customer_id WHERE c.cpf = ?";
      connection.query(query, [cpf], (err, result) => {
        if (err) return reject(err.sqlMessage);
        if (!result[0]) {
          return reject("Account not found.");
        }
        resolve(result[0]);
      });
    });
  }

  static getByAccountNumber(account_number) {
    if (!account_number) {
      return Promise.reject("Missing required field: account_number");
    }

    return new Promise((resolve, reject) => {
      const query =
        "SELECT a.account_id, a.account_number, c.name FROM accounts a INNER JOIN customers c ON a.customer_id = c.customer_id WHERE a.account_number LIKE ?";
      connection.query(query, [`%${account_number}%`], (err, result) => {
        if (err) return reject(err.sqlMessage);
        if (!result) {
          return reject("Account not found.");
        }
        resolve(result);
      });
    });
  }
}

module.exports = Account;
