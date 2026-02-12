import express from "express";
import { getUserRewards } from "../controllers/rewardController.js";

const router = express.Router();

// GET all rewards info for a user
router.get("/:userId", getUserRewards);

export default router;
