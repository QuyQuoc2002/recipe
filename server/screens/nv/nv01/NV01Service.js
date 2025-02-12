import * as NV01Repository from "./NV01Repository.js";

export const getAllDish = async (req, res) => {
  try {
    const results = await NV01Repository.getAllDish();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllFilter = async (req, res) => {
  try {
    const level = await NV01Repository.getAllLevel();
    const cat = await NV01Repository.getAllCat();
    const meth = await NV01Repository.getAllMeth();
    return res.status(200).json({ level, cat, meth });
  } catch (error) {
    return res.status(500).json(error);
  }
};
