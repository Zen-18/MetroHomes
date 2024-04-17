import express from "express";
import {
  bookVisit,
  cancelBooking,
  createUser,
  loginUser,
  getAllBookings,
  getAllFavorites,
  toFav,
  SendEmail,
  getUserData,
  verifyEmail,
  resetPassword,
  generateForgotPassWordToken,

} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBookings/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav/", getAllFavorites);
router.post("/verify-email", verifyEmail);
router.post("/getUser", getUserData);
router.post("/send-verify-email", SendEmail);
router.post("/verify-email", verifyEmail);
router.post("/get-password-token", generateForgotPassWordToken);
router.patch("/reset-password", resetPassword);


export { router as userRoute };