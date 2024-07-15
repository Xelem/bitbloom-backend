const express = require("express");
const { getCurrentUser, updateUser } = require("../controllers/userController");
const verifyJwt = require("../middlewares/auth");
const router = express.Router();

router.use(verifyJwt);
router.get("/me", getCurrentUser);
router.patch("/", updateUser);

module.exports = router;
