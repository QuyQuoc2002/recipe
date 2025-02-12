import { executeQuery } from "../../../db.js";

export const addStaff = async (params) => {
  try {
    const query = `
      INSERT INTO staff (
        fullname,
        mobile,
        birthday,
        email,
        account,
        accountOrigin
      ) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const findStaffByAccount = async (params) => {
  try {
    const query =
      "SELECT COUNT(*) AS total FROM staff WHERE accountOrigin = ?;";
    const results = await executeQuery(query, params);
    return results[0].total;
  } catch (error) {
    throw error;
  }
};
