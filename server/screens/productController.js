import express from "express";
import {
  getAllProduct,
  getOneProductById,
  addOneBlog,
  updateOneProductById,
  deleteOneProductById,
} from "../../services/admin/product.js";

const router = express.Router();

router.get("/", getAllProduct);
router.get("/detail/:product_id", getOneProductById);
router.post("/", addOneBlog);
router.put("/detail/:product_id", updateOneProductById);
router.delete("/detail/:product_id", deleteOneProductById);

export default router;
