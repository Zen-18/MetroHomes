import express from 'express'
import { createLoan, deleteLoan, getAllLoans, getLoan } from '../controllers/loanController.js'

const router = express.Router()

router.post("/create", createLoan)
router.get("/allLoans", getAllLoans)
router.get("/:id", getLoan)
// router.patch("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export {router as loanRoute}