const connection = require("../config");

class BillToPay {
  static create(body) {
    const { account_id, value, description, date_due } = body;

    if (!account_id || !value || !description || !date_due) {
      return Promise.reject(
        "Missing required fields: customer_id, amount, description, date_due"
      );
    }

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO bills_to_pay (account_id, value, description, date_due, status) VALUES(?,?,?,?,'em_aberto')";
      connection.query(
        query,
        [account_id, value, description, date_due],
        (err, result) => {
          if (err) return reject(err.sqlMessage);
          resolve(result);
        }
      );
    });
  }

  static get(account_id) {
    if (!account_id) {
      return Promise.reject("Missing required field: account_id");
    }

    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM bills_to_pay WHERE account_id = ?";
      connection.query(query, [account_id], (err, result) => {
        if (err) return reject(err.sqlMessage);
        resolve(result);
      });
    });
  }

  static pay({ bill_to_pay_id, account_id, value, description }) {
    if ((!bill_to_pay_id, !account_id, !value, !description)) {
      return Promise.reject(
        "Missing required fields: bill_to_pay_id, account_id, value"
      );
    }

    return new Promise(async (resolve, reject) => {
      try {
        connection.beginTransaction();

        const billPaid = await connection.execute(
          "UPDATE bills_to_pay SET status = 'pago' WHERE bill_to_pay_id = ?",
          [bill_to_pay_id]
        );

        const accountDebit = await connection.execute(
          "UPDATE accounts SET balance = balance - ? WHERE account_id = ?",
          [value, account_id]
        );

        const transaction = await connection.execute(
          "INSERT INTO transactions (type, value, origin_account_id, description) VALUES('pagamento', ?, ?, ?)",
          [value, account_id, description]
        );

        connection.commit();

        resolve({ accountDebit, billPaid, transaction });
      } catch (err) {
        connection.rollback();

        reject(err.sqlMessage);
      }
    });
  }

  static deleteBill(bill_to_pay_id) {
    if (!bill_to_pay_id) {
      return Promise.reject("Missing required field: bill_to_pay_id");
    }

    return new Promise((resolve, reject) => {
      const query = "DELETE FROM bills_to_pay WHERE bill_to_pay_id = ?";
      connection.query(query, [bill_to_pay_id], (err, result) => {
        if (err) return reject(err.sqlMessage);
        resolve(result);
      });
    });
  }
}

module.exports = BillToPay;
