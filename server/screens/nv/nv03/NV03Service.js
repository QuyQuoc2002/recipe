import * as NV03Repository from "./NV03Repository.js";

export const getStaffAccount = async (req, res) => {
  try {
    const { account } = req.body;
    const result = await NV03Repository.getStaffAccount([account]);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const saveStaffAccount = async (req, res) => {
  try {
    const { account, password, fullname, mobile, birthday, email } = req.body;
    await NV03Repository.saveStaffAccount([
      mobile,
      birthday,
      email,
      password,
      account,
    ]);
    return res.status(200).json({ account, fullname });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteStaffAccount = async (req, res) => {
  try {
    const { account, fullname } = req.body;
    await NV03Repository.deleteStaffAccount([account]);
    return res.status(200).json({ account, fullname });
  } catch (error) {
    return res.status(500).json(error);
  }
};
