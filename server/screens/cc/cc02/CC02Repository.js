import { query } from "express";
import { executeQuery } from "../../../db.js";

export const getAllLevel = async () => {
  try {
    const query = `SELECT * FROM level`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllCat = async () => {
  try {
    const query = `SELECT * FROM cat ORDER BY name`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllMeth = async () => {
  try {
    const query = `SELECT * FROM meth ORDER BY name`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllMainIngre = async () => {
  try {
    const query = `SELECT * FROM main_ingre ORDER BY name`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllIngre = async () => {
  try {
    const query = `SELECT * FROM ingre ORDER BY name`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const saveDish = async (params) => {
  try {
    const query = `
      UPDATE dish SET
        thumbnail = ?,
        name = ?,
        \`des\` = ?,
        catId = ?,
        levelId = ?,
        time = ?,
        methId = ?,
        mainIngreId = ?
      WHERE id = ?
     `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const saveStep = async (dishId, listStep) => {
  try {
    const deleteQuery = `DELETE FROM step WHERE dishId = ?`;
    const addQuery = `
      INSERT INTO step (dishId, \`des\`) VALUES ?;
    `;
    await executeQuery(deleteQuery, [dishId]);
    const values = listStep.map((step) => [dishId, step.des]);
    const results = await executeQuery(addQuery, [values]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const saveDishIngre = async (dishId, listIngre) => {
  try {
    const deleteQuery = `DELETE FROM dish_ingre WHERE dishId = ?`;
    const addQuery = `
      INSERT INTO dish_ingre (dishId, ingreId, quantity) VALUES ?;
    `;
    await executeQuery(deleteQuery, [dishId]);
    const values = listIngre.map((ingre) => [
      dishId,
      ingre.ingreId,
      ingre.quantity,
    ]);
    const results = await executeQuery(addQuery, [values]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getDish = async (params) => {
  try {
    const query = `
    SELECT 
      d.id,
      d.thumbnail,
      d.name,
      d.des,
      d.catId,
      c.name as cat,
      d.levelId,
      l.name as level,
      d.time,
      d.methId,
      m.name as meth,
      d.mainIngreId,
      mi.name as mainIngre
    FROM dish d
      JOIN cat c ON d.catId = c.id
      JOIN level l ON d.levelId = l.id
      JOIN meth m ON d.methId = m.id
      JOIN main_ingre mi ON d.mainIngreId = mi.id
    WHERE d.id = ?
    `;
    const results = await executeQuery(query, params);
    return results?.[0];
  } catch (error) {
    throw error;
  }
};

export const getListDishIngre = async (params) => {
  try {
    const query = `
      SELECT *
      FROM dish_ingre
      WHERE dishId = ?
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getListStep = async (params) => {
  try {
    const query = `
      SELECT * FROM step WHERE dishId = ?
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const deleteDish = async (params) => {
  try {
    const query = `DELETE FROM dish WHERE id = ?`;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};
