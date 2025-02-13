import express from "express";
import { getAllDish, getAllFilter, hello } from "./NV01Service.js";

const router = express.Router();

router.get("/hello", hello);
router.post("/get-all-dish", getAllDish);
router.post("/get-all-filter", getAllFilter);

export default router;
