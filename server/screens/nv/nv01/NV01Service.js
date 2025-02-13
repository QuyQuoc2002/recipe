import * as NV01Repository from "./NV01Repository.js";

export const hello = async (req, res) => {
  try {
    return res.status(200).json("Hello");
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllDish = async (req, res) => {
  try {
    const { search } = req.body;
    const results = await NV01Repository.getAllDish([`%${search}%`]);
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
    const mainIngre = await NV01Repository.getAllMainIngre();
    return res.status(200).json({ level, cat, meth, mainIngre });
  } catch (error) {
    return res.status(500).json(error);
  }
};
