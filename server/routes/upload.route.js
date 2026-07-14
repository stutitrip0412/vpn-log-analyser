import express from "express";
import upload from "../middleware/multer.middleware.js";
import { uploadLog } from "../controllers/upload.controller.js";

const router = express.Router();

router.post(
  "/",
  upload.single("logFile"),
  uploadLog
);

export default router;