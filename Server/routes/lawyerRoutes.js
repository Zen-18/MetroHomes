import express from 'express'
import { createLawyer, deleteLawyer, getAllLawyers, getLawyer } from '../controllers/lawyerController.js'

const router = express.Router()

router.post("/register", createLawyer)
router.get("/allLawyer", getAllLawyers)
router.get("/:id", getLawyer)
// router.patch("/:id", updateLawyer);
router.delete("/:id", deleteLawyer);

export {router as lawyerRoute}