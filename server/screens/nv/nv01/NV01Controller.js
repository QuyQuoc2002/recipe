import express from "express";
import { getAllStaff } from "./NV01Service.js";

const router = express.Router();

router.post("/get-all-staff", getAllStaff);

export default router;
