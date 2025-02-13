import express from "express";
import { getInfoInit, addDish } from "./MA01Service.js";

const router = express.Router();

router.post("/get-info-init", getInfoInit);
router.post("/add-dish", addDish);

export default router;
