import * as NV01Repository from "./NV01Repository.js";

export const getAllStaff = async (req, res) => {
  try {
    const results = await NV01Repository.getAllStaff();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};
