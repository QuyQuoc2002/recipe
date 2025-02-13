import * as MA01Repository from "./MA01Repository.js";

export const getInfoInit = async (req, res) => {
  try {
    const level = await MA01Repository.getAllLevel();
    const cat = await MA01Repository.getAllCat();
    const meth = await MA01Repository.getAllMeth();
    const mainIngre = await MA01Repository.getAllMainIngre();
    const ingre = await MA01Repository.getAllIngre();
    return res.status(200).json({ level, cat, meth, mainIngre, ingre });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const addDish = async (req, res) => {
  const {
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
    const dish = await MA01Repository.addDish([
      thumbnail,
      name,
      des,
      catId,
      levelId,
      time,
      methId,
      mainIngreId,
    ]);
    const dishId = dish.insertId;
    if (step.length > 0) await MA01Repository.addStep(dishId, step);
    if (ingre.length > 0) await MA01Repository.addDishIngre(dishId, ingre);
    return res.status(200).json({ dishId });
  } catch (error) {
    return res.status(500).json(error);
  }
};
