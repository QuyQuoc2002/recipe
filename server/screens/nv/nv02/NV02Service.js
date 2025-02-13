import * as NV02Repository from "./NV02Repository.js";

export const getDish = async (req, res) => {
  try {
    const { id } = req.body;
    const dish = await NV02Repository.getDish([id]);
    const listIngre = await NV02Repository.getListIngre([id]);
    const listStep = await NV02Repository.getListStep([id]);
    return res.status(200).json({ ...dish, listIngre, listStep });
  } catch (error) {
    return res.status(500).json(error);
  }
};
