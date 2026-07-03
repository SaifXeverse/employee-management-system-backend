import { db } from "../libs/db.js";

export const findUserEmail = async (email) => {
    const q = "SELECT * FROM users WHERE email = ?";
    const [row] = await db.execute(q, [email]);
    return row;
}

export const createUser = async ({
    name,
    email,
    password
}) => {
    const q = 'INSERT INTO users (name,email,password) VALUES (?, ?, ?)';
    const [result] = await db.execute(q, [
        name,
        email,
        password
    ]);
    return result;
}

export const getAllUsers  = async  () => {
    const q = `SELECT * FROM users`;
    const [rows] = await db.execute(q)
    return  rows;
}