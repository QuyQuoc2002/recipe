import * as CC01Repository from "./CC01Repository.js";

export const getAllDish = async (req, res) => {
  try {
    const results = await CC01Repository.getAllDish();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};
