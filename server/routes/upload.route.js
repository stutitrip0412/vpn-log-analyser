import express from "express";
import multer from "multer";
import { uploadLog } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { audit } from "../middleware/audit.middleware.js";
import { ROLES } from "../constants/role.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/",
  verifyJWT,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.INVESTIGATOR
),
audit("VPN Log Uploaded"),
  upload.single("logFile"),
  uploadLog,
);

export default router;
