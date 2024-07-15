const express = require("express");
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const verifyJwt = require("../middlewares/auth");
const router = express.Router();

router.use(verifyJwt);
router.post("/", createTransaction);
router.get("/", getTransactions);

module.exports = router;
