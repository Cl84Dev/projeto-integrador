const connection = require("../config");

class Transaction {
  static get(account_id) {
    if (!account_id) {
      return Promise.reject("Missing required field: account_id");
    }

    return new Promise((resolve, reject) => {
      const query =
        "SELECT t.date_time, t.type, cus.name AS origin_name, a.account_number AS origin_account, cust.name as target_name, ac.account_number as target_account, t.value FROM transactions t LEFT JOIN accounts a ON t.origin_account_id = a.account_id LEFT JOIN customers cus ON a.customer_id = cus.customer_id LEFT JOIN accounts ac ON t.target_account_id = ac.account_id LEFT JOIN customers cust ON ac.customer_id = cust.customer_id  WHERE t.origin_account_id = ? OR t.target_account_id = ?";
      connection.query(query, [account_id, account_id], (err, result) => {
        if (err) return reject(err.sqlMessage);
        resolve(result);
      });
    });
  }

  static transfer({ origin_account_id, target_account_id, value }) {
    if ((!origin_account_id, !target_account_id, !value)) {
      return Promise.reject(
        "Missing required fields: origin_account_id, target_account_id, account_id, value, description"
      );
    }

    return new Promise(async (resolve, reject) => {
      try {
        connection.beginTransaction();

        const transaction = await connection.execute(
          "INSERT INTO transactions (type, value, origin_account_id, target_account_id, description) VALUES('transferencia', ?, ?, ?, 'Transferência')",
          [value, origin_account_id, target_account_id]
        );

        const originAccountDebit = await connection.execute(
          "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
          [value, origin_account_id]
        );

        const targetAccountCredit = await connection.execute(
          "UPDATE accounts SET balance = balance + ? WHERE account_id = ?",
          [value, target_account_id]
        );

        connection.commit();

        resolve({ transaction, originAccountDebit, targetAccountCredit });
      } catch (err) {
        connection.rollback();

        reject(err.sqlMessage);
      }
    });
  }
}

module.exports = Transaction;
