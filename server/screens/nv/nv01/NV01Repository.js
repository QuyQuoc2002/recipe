import { executeQuery } from "../../../db.js";

export const getAllStaff = async () => {
  try {
    const query = "SELECT * FROM staff WHERE isDeleted = false";
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};
