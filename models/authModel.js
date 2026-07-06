import { db } from "../libs/db.js";

export const findUserEmail = async (email) => {
  const q = "SELECT * FROM users WHERE email = ?";
  const [row] = await db.execute(q, [email]);
  return row;
};

export const createUser = async ({ name, email, password }) => {
  const q = "INSERT INTO users (name,email,password) VALUES (?, ?, ?)";
  const [result] = await db.execute(q, [name, email, password]);
  return result;
};

export const getDBUser = async (id) => {
  const q = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await db.execute(q, [id]);
  return rows;
};

export const updateDBUser = async (id, userData) => {
  const { img, name, email } = userData;
  const q = "UPDATE users SET img = ?, name = ?, email = ? WHERE id = ?";
  const [result] = await db.execute(q, [img, name, email, id]);
  return result;
};
