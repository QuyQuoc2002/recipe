import express from "express";
import { getAllDish } from "./CC01Service.js";

const router = express.Router();

router.post("/get-all-dish", getAllDish);

export default router;
