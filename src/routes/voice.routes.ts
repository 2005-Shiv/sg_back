import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import multer from "multer";
import { handleVoiceInput } from "../controllers/voice.controller";

const router = Router();

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10 * 1024 * 1024 }
});

router.post("/", authMiddleware, upload.single("audio"), handleVoiceInput);

export default router;
