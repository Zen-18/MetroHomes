import express from 'express';
import { bookVisit, cancelBooking, createUser, getAllFavourites, getAllbookings, toFav } from '../controllers/userControllers.js';

const router = express.Router()

router.post("/register", createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", getAllbookings)
router.post("/removeBooking/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav/", getAllFavourites)
export { router as userRoute };