import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Password",
  database: "employee_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
