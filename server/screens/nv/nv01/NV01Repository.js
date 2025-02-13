import { executeQuery } from "../../../db.js";

export const getAllDish = async (params) => {
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
    WHERE d.name LIKE ?
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

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
