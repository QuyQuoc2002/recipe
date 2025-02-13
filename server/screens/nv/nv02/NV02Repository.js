import { executeQuery } from "../../../db.js";

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

export const getListIngre = async (params) => {
  try {
    const query = `
      SELECT quantity, name, unit 
      FROM dish_ingre di JOIN ingre i ON di.ingreId = i.id 
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
