import express from "express";
import { getAllDish, getAllFilter } from "./NV01Service.js";

const router = express.Router();

router.post("/get-all-dish", getAllDish);
router.post("/get-all-filter", getAllFilter);

export default router;
