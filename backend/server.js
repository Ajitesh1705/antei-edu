import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import morgan from "morgan";
import { verifyToken } from "./middleware/authMiddleware.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));


app.use("/auth",authRoutes);
app.use("/api", verifyToken,aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));