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

export const addDish = async (params) => {
  try {
    const query = `
      INSERT INTO dish (
        thumbnail,
        name,
        \`des\`,
        catId,
        levelId,
        time,
        methId,
        mainIngreId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
     `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const addStep = async (dishId, listStep) => {
  try {
    const query = `
      INSERT INTO step (dishId, \`des\`) VALUES ?;
    `;
    const values = listStep.map((step) => [dishId, step.des]);
    const results = await executeQuery(query, [values]);
    return results;
  } catch (error) {
    throw error;
  }
};

export const addDishIngre = async (dishId, listIngre) => {
  try {
    const query = `
      INSERT INTO dish_ingre (dishId, ingreId, quantity) VALUES ?;
    `;
    const values = listIngre.map((ingre) => [
      dishId,
      ingre.ingreId,
      ingre.quantity,
    ]);
    const results = await executeQuery(query, [values]);
    return results;
  } catch (error) {
    throw error;
  }
};
