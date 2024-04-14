import express from 'express'
import { createResidency, deleteResidency, getAllResidencies, getResidency, updateResidency } from '../controllers/residencyController.js'

const router = express.Router()

router.post("/create", createResidency)
router.get("/allresd", getAllResidencies)
router.get("/:id", getResidency)
router.patch("/:id", updateResidency);
router.delete("/:id", deleteResidency);

export {router as residencyRoute}