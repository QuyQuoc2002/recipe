import express from "express";
import {
  getStaffAccount,
  saveStaffAccount,
  deleteStaffAccount,
} from "./NV03Service.js";

const router = express.Router();

router.post("/get-staff-account", getStaffAccount);
router.post("/save-staff-account", saveStaffAccount);
router.post("/delete-staff-account", deleteStaffAccount);

export default router;
