import express from 'express'
import { bookVisit, cancelBooking, createUser, getAllBookings, getAllFavorites, toFav } from "../controllers/userController.js"
import jwtCheck from '../Config/auth0Config.js'

const router = express.Router()

router.post("/register", jwtCheck, createUser)
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBookings/:id", cancelBooking)
router.post("/toFav/:rid", toFav)
router.post("/allFav/", getAllFavorites)

export {router as userRoute}