const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (error, hash) => {
      if (error) {
        return reject("Error hashing password.");
      }

      return resolve(hash);
    });
  });
}

function verifyPassword(password, receivedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, receivedPassword, (error, result) => {
      if (error) {
        return reject("Error dehashing password.");
      }

      return resolve(result);
    });
  });
}

module.exports = { hashPassword, verifyPassword };
