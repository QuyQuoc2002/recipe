import { executeQuery } from "../../../db.js";

export const getStaffAccount = async (params) => {
  try {
    const query = "SELECT * FROM staff WHERE account = ? AND isDeleted = false";
    const results = await executeQuery(query, params);
    return results[0];
  } catch (error) {
    throw error;
  }
};

export const saveStaffAccount = async (params) => {
  try {
    const query = `    
      UPDATE staff 
      SET
        mobile = ?,
        birthday = ?,
        email = ?,
        password = ?
      WHERE account = ?
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const deleteStaffAccount = async (params) => {
  try {
    const query = `    
      UPDATE staff 
      SET
        isDeleted = 1
      WHERE account = ?
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};
