const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "integrator-mysql",
  user: "admin",
  password: "admin",
  database: "bank_account",
});

module.exports = connection;
