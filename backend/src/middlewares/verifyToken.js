const jwt = require("jsonwebtoken");

const SECRET_KEY = "jsdhfkjsdhf67sdf6s8dfsjh";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = verifyToken;
