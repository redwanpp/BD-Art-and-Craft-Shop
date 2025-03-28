import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/paymnet.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/create-checkout-session", protectRoute, checkoutSuccess);

export default router;
