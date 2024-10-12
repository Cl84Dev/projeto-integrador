const express = require("express");
const cors = require("cors");
const connection = require("./config.js");

const customerRouter = require("./routes/customerRoutes.js");
const accountRouter = require("./routes/accountRoutes.js");
const billToPayRouter = require("./routes/billToPayRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");

const verifyToken = require("./middlewares/verifyToken.js");

const app = express();
const port = 5000;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use(express.json());

app.use("/api", customerRouter);

app.use(verifyToken);

app.use("/api", accountRouter);
app.use("/api", billToPayRouter);
app.use("/api", transactionRouter);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.stack);
    return;
  } else {
    console.log("Connected with id " + connection.threadId);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
});
