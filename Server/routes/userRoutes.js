import express from 'express'
import { bookVisit, cancelBooking, createUser, loginUser,
     getAllBookings, getAllFavorites, toFav, 
     verifyEmail} from "../controllers/userController.js"

const router = express.Router()

router.post("/login", loginUser)
router.post("/register", createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBookings/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav/", getAllFavorites)
router.post("/verify-email",verifyEmail)

export {router as userRoute}