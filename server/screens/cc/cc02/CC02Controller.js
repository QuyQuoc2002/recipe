import express from "express";
import { getInfoInit, getDish, saveDish, deleteDish } from "./CC02Service.js";

const router = express.Router();

router.post("/get-info-init", getInfoInit);
router.post("/get-dish", getDish);
router.post("/save-dish", saveDish);
router.post("/delete-dish", deleteDish);

export default router;
