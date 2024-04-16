import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRoute } from "./routes/userRoutes.js";
import { residencyRoute } from "./routes/residencyRoute.js";
import pkg from '@prisma/client';
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid';
import { lawyerRoute } from "./routes/lawyerRoutes.js";
import { loanRoute } from "./routes/loanRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use('/api/user', userRoute)
app.use("/api/residency", residencyRoute)
app.use("/api/lawyer", lawyerRoute)
app.use("/api/loan", loanRoute)

app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`)
});
