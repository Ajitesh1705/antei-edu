import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/verify", verifyToken, (req, res) => {
    res.json({ uid: req.user.localId, email: req.user.email });
});

export default router;