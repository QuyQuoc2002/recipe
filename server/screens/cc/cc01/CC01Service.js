import * as CC01Repository from "./CC01Repository.js";
import moment from "moment/moment.js";

export const getTimekeeping = async (req, res) => {
  try {
    const { dateFormat, startDate, endDate, account } = req.body;
    let results = await CC01Repository.getTimekeeping([
      startDate,
      endDate,
      account || null,
      account || null,
    ]);
    results = results.map((item) => ({
      ...item,
      workingDate: moment(item.workingDate).format(dateFormat),
    }));
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTimekeepingToday = async (req, res) => {
  try {
    const { dateFormat } = req.body;
    let results = await CC01Repository.getTimekeepingToday();
    results = results.map((item) => ({
      ...item,
      workingDate: moment(item.workingDate).format(dateFormat),
    }));
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const checkIn = async (req, res) => {
  const { account, password } = req.body;
  try {
    const staff = await CC01Repository.getStaffAccountPassWord([
      account,
      password,
    ]);
    if (!staff) return res.status(500).json("Sai mã nhân viên hoặc mật khẩu");
    const isStaffCheckedIn = await CC01Repository.isStaffCheckedIn([account]);
    if (isStaffCheckedIn)
      return res.status(500).json("Hôm nay bạn đã check in rồi");
    await CC01Repository.checkIn([account]);
    return res.status(200).json({ account });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const checkOut = async (req, res) => {
  const { account, password } = req.body;
  try {
    const staff = await CC01Repository.getStaffAccountPassWord([
      account,
      password,
    ]);
    if (!staff) return res.status(500).json("Sai mã nhân viên hoặc mật khẩu");
    const isStaffCheckedIn = await CC01Repository.isStaffCheckedIn([account]);
    if (!isStaffCheckedIn)
      return res.status(500).json("Hôm nay bạn chưa check in");
    await CC01Repository.checkOut([account]);
    return res.status(200).json({ account });
  } catch (error) {
    return res.status(500).json(error);
  }
};
