import express from "express";
import { addStaff } from "./NV02Service.js";

const router = express.Router();

router.post("/add-staff", addStaff);

export default router;
