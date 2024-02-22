const express = require("express");
const {
  loginUser,
  signupUser,
  updateUserEmail,
  updatePassword,
} = require("../controllers/loginControllers");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.put("/update/email", updateUserEmail);
router.put("/update/password", updatePassword);

module.exports = router;
