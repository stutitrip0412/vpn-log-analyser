import express from "express";
import { audit } from "../middleware/audit.middleware.js";
import { registerUser, loginUser, refreshAccessToken, logoutUser, getCurrentUser } from "../controllers/auth.controller.js";
import { verifyJWT} from "../middleware/auth.middleware.js";
const router = express.Router();

router.post(
  "/register",

  registerUser,
);

router.post("/login",audit("User Login"), loginUser);

router.post(
    "/refresh",
    refreshAccessToken
);

router.post(
    "/logout",audit("User Login"),
    verifyJWT,
    logoutUser
);

router.get(
    "/me",
    verifyJWT,
    getCurrentUser
);

export default router;
