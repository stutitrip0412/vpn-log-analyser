import express from "express";

import {
  trafficAnalytics,
  countryAnalytics,
  impossibleTravel,
  simultaneousLogins,
  bruteForceDetection,
  dashboardSummary
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/traffic", trafficAnalytics);

router.get("/countries", countryAnalytics);

router.get(
"/impossible-travel",impossibleTravel);
router.get("/simultaneous-logins",simultaneousLogins);
router.get("/brute-force",bruteForceDetection);
router.get("/dashboard",dashboardSummary);


export default router;