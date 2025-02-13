import express from "express";
import { getDish } from "./NV02Service.js";

const router = express.Router();

router.post("/get-dish", getDish);

export default router;
