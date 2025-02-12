import { executeQuery } from "../../../db.js";

export const getTimekeeping = async (params) => {
  try {
    const query = `
      SELECT * FROM timekeeping 
      WHERE workingDate BETWEEN ? AND ?
      AND (account = ? OR ? IS NULL)
      ORDER BY timeIn DESC
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getTimekeepingToday = async () => {
  try {
    const query =
      "SELECT * FROM timekeeping WHERE workingDate = CURDATE() ORDER BY timeIn DESC";
    const results = await executeQuery(query, []);
    return results;
  } catch (error) {
    throw error;
  }
};

export const getStaffAccountPassWord = async (params) => {
  try {
    const query = `SELECT account, password FROM staff WHERE account = ? AND password = ?;`;
    const results = await executeQuery(query, params);
    return results[0];
  } catch (error) {
    throw error;
  }
};

export const isStaffCheckedIn = async (params) => {
  try {
    const query = `SELECT account FROM timekeeping WHERE account = ? AND workingDate = CURDATE()`;
    const results = await executeQuery(query, params);
    return results[0];
  } catch (error) {
    throw error;
  }
};

export const checkIn = async (params) => {
  try {
    const query = `
      INSERT INTO timekeeping ( workingDate, account, timeIn ) 
      VALUES (CURDATE(), ?, CURTIME())
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};

export const checkOut = async (params) => {
  try {
    const query = `
      UPDATE timekeeping 
      SET timeOut = CURTIME()
      WHERE account = ? AND workingDate = CURDATE()
    `;
    const results = await executeQuery(query, params);
    return results;
  } catch (error) {
    throw error;
  }
};
