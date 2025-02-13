import * as CC02Repository from "./CC02Repository.js";

export const getInfoInit = async (req, res) => {
  try {
    const level = await CC02Repository.getAllLevel();
    const cat = await CC02Repository.getAllCat();
    const meth = await CC02Repository.getAllMeth();
    const mainIngre = await CC02Repository.getAllMainIngre();
    const ingre = await CC02Repository.getAllIngre();
    return res.status(200).json({ level, cat, meth, mainIngre, ingre });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const saveDish = async (req, res) => {
  const {
    id,
    thumbnail,
    name,
    des,
    catId,
    levelId,
    time,
    methId,
    mainIngreId,
    ingre,
    step,
  } = req.body;
  try {
    await CC02Repository.saveDish([
      thumbnail,
      name,
      des,
      catId,
      levelId,
      time,
      methId,
      mainIngreId,
      id,
    ]);
    if (step.length > 0) await CC02Repository.saveStep(id, step);
    if (ingre.length > 0) await CC02Repository.saveDishIngre(id, ingre);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDish = async (req, res) => {
  try {
    const { id } = req.body;
    const dish = await CC02Repository.getDish([id]);
    const ingre = await CC02Repository.getListDishIngre([id]);
    const step = await CC02Repository.getListStep([id]);
    return res.status(200).json({ ...dish, ingre, step });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.body;
    const dish = await CC02Repository.deleteDish([id]);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).json(error);
  }
};
