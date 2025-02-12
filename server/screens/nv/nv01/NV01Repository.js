import { executeQuery } from "../../../db.js";

export const getAllDish = async () => {
  try {
    const query = `
    SELECT 
      d.id,
      d.thumbnail,
      d.name,
      d.des,
      d.vid,
      d.catId,
      c.name as cat,
      d.levelId,
      l.name as level,
      d.time,
      d.methId,
      m.name as meth 
    FROM dish d
      JOIN cat c ON d.catId = c.id
      JOIN level l ON d.levelId = l.id
      JOIN meth m ON d.methId = m.id;
    `;
    const results = await executeQuery(query, []);
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
    const query = `SELECT * FROM cat`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllMeth = async () => {
  try {
    const query = `SELECT * FROM meth`;
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};
