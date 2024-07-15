const express = require("express");
const { signup, login, verifyEmail } = require("../controllers/authController");
const verifyJwt = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(verifyJwt);
router.post("/email", verifyEmail);

module.exports = router;
