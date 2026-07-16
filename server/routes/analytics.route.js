import express from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import {
  trafficAnalytics,
  countryAnalytics,
  impossibleTravel,
  simultaneousLogins,
  bruteForceDetection,
  dashboardSummary,
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/role.js";
import { audit } from "../middleware/audit.middleware.js";

const router = express.Router();

router.get(
  "/traffic",
  verifyJWT,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.INVESTIGATOR,
    ROLES.ANALYST
),
  trafficAnalytics,
);
router.get("/countries", verifyJWT, countryAnalytics);
router.get(
  "/impossible-travel",
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.INVESTIGATOR,
    ROLES.ANALYST
),
  verifyJWT,
  impossibleTravel,
);
router.get("/simultaneous-logins", verifyJWT, simultaneousLogins);
router.get(
  "/brute-force",
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.INVESTIGATOR,
    ROLES.ANALYST
),
  verifyJWT,
  bruteForceDetection,
);
router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles(
    ROLES.ADMIN,
    ROLES.INVESTIGATOR,
    ROLES.ANALYST
),
  audit("Viewed Dashboard"),

  dashboardSummary,
);

export default router;
