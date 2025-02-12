import express from "express";
import {
  getTimekeeping,
  getTimekeepingToday,
  checkIn,
  checkOut,
} from "./CC01Service.js";

const router = express.Router();

router.post("/get-timekeeping", getTimekeeping);
router.post("/get-timekeeping-today", getTimekeepingToday);
router.post("/check-in", checkIn);
router.post("/check-out", checkOut);

export default router;
