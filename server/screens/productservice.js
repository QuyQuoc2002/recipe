import { db, executeQuery } from "../../db.js";

export const getAllProduct = (req, res) => {
  const query = `
    SELECT 
      product_id,
      product_name,
      product.product_category_id,
      product_weight_per_package,
      product_category_name,
      product_img,
      product_price,
      product_sku,
      product_is_active
    FROM product JOIN product_category ON product.product_category_id = product_category.product_category_id
    WHERE product_is_deleted = false
  `;
  db.query(query, [], (error, results) => {
    if (error) {
      return res.status(500).json("Somthing went wrong");
    }
    return res.status(200).json(results);
  });
};

export const getOneProductById = async (req, res) => {
  const { product_id } = req.params;
  const productQuery = `
    SELECT *
    FROM product 
    WHERE product_id = ? AND product_is_deleted = false;
  `;
  const categoryQuery = `SELECT * FROM product_category`;
  const originQuery = `SELECT * FROM product_origin`;
  const heightQuery = `SELECT * FROM product_height`;
  const seedTypeQuery = `SELECT * FROM product_seed_type`;
  const processingMethodQuery = `SELECT * FROM product_processing_method`;
  try {
    const resultsProduct = await executeQuery(productQuery, [product_id]);
    if (resultsProduct.length === 0) {
      return res.status(404).json("Not Found");
    }
    const resultsCategory = await executeQuery(categoryQuery, []);
    const resultsOrigin = await executeQuery(originQuery, []);
    const resultsHeight = await executeQuery(heightQuery, []);
    const resultsSeedType = await executeQuery(seedTypeQuery, []);
    const resultsProcessingMethod = await executeQuery(
      processingMethodQuery,
      []
    );
    const results = {
      product: resultsProduct[0],
      product_category: resultsCategory,
      product_origin: resultsOrigin,
      product_height: resultsHeight,
      product_seed_type: resultsSeedType,
      product_processing_method: resultsProcessingMethod,
    };
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json("Something Wrong");
  }
};

export const addOneBlog = (req, res) => {
  const query = `
    INSERT INTO product (
      product_name,
      product_img,
      product_price,
      product_overview,
      product_desc,
      product_additional_information,
      product_origin_id,
      product_height_id,
      product_seed_type_id,
      product_processing_method_id,
      product_weight_per_package,
      product_category_id,
      product_is_active,
      product_is_deleted,
      product_sku
    ) 
    VALUES ("Product Name", "", 1, "", "", "", 1, 1, 1, 1, "", 1, false, false, 0)
  `;
  db.query(query, [], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json("Something went wrong");
    }
    res
      .status(201)
      .json({ message: "Blog created successfully", id: results.insertId });
  });
};

export const updateOneProductById = (req, res) => {
  const {
    product_name,
    product_img,
    product_price,
    product_overview,
    product_desc,
    product_additional_information,
    product_origin_id,
    product_height_id,
    product_seed_type_id,
    product_processing_method_id,
    product_weight_per_package,
    product_category_id,
    product_is_active,
  } = req.body;
  const { product_id } = req.params;

  const query = `
    UPDATE product 
    SET
      product_name = ?,
      product_img = ?,
      product_price = ?,
      product_overview = ?,
      product_desc = ?,
      product_additional_information = ?,
      product_origin_id = ?,
      product_height_id = ?,
      product_seed_type_id = ?,
      product_processing_method_id = ?,
      product_weight_per_package = ?,
      product_category_id = ?,
      product_is_active = ?
    WHERE product_id = ?
  `;
  db.query(
    query,
    [
      product_name,
      product_img,
      product_price,
      product_overview,
      product_desc,
      product_additional_information,
      product_origin_id,
      product_height_id,
      product_seed_type_id,
      product_processing_method_id,
      product_weight_per_package,
      product_category_id,
      product_is_active,
      product_id,
    ],
    (error) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json("Có lỗi khi thêm sản phẩm, vui lòng thử lại");
      }

      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    }
  );
};

export const deleteOneProductById = (req, res) => {
  const { product_id } = req.params;

  const query = `
    UPDATE product SET product_is_deleted = true
    WHERE product_id = ?
  `;
  db.query(query, [product_id], (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json("Có lỗi khi xóa sản phẩm, vui lòng thử lại");
    }

    res.status(200).json({ message: "Xóa sản phẩm thành công" });
  });
};
