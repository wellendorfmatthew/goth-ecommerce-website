const express = require("express");
const {
  loginUser,
  signupUser,
  updateUserEmail,
  updatePassword,
  addToWishList,
  deleteFromWishList,
  getWishList,
  getOrders,
  addOrders,
  updateProfilePicture,
  deleteProfilePicture,
  getUserInfo,
  getSession,
  signOut,
} = require("../controllers/loginControllers");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.put("/update/email", updateUserEmail);
router.put("/update/password", updatePassword);
router.put("/wishlist", addToWishList);
router.delete("/wishlist", deleteFromWishList);
router.get("/wishlist", getWishList);
router.get("/orders", getOrders);
router.put("/orders", addOrders);
router.put("/picture", updateProfilePicture);
router.delete("/picture", deleteProfilePicture);
router.get("/info", getUserInfo);
router.get("/session", getSession);
router.post("/signout", signOut);

module.exports = router;
