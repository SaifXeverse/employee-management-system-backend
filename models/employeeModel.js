import { db } from "../libs/db.js";

export const findEmployeeEmail = async (email) => {
  const q = "SELECT * FROM employees WHERE email = ?";
  const [row] = await db.execute(q, [email]);
  return row;
};

export const employeeAdd = async (img, name, email, department, salary) => {
  const q =
    "INSERT  INTO employees (img,name,email,department,salary) VALUES (?, ?, ?, ?, ?)";
  const [result] = await db.execute(q, [img, name, email, department, salary]);
  return result;
};

export const singleEmployee = async (id) => {
  const q = "SELECT * FROM employees WHERE id = ?";
  const [rows] = await db.execute(q, [id]);
  return rows[0];
};

export const allEmployees = async () => {
  const q = "SELECT * FROM employees";
  const [rows] = await db.execute(q);
  return rows;
};

export const employeeDelete = async (id) => {
  const q = "DELETE FROM employees WHERE id = ?";
  const [rows] = await db.execute(q, [id]);
  return rows[0];
};

export const employeeUpdate = async (id, employeeData) => {
  const { name, email, department, salary, img } = employeeData;
  const q =
    "UPDATE employees SET img = ?, name = ?, email = ?, department = ?,  salary = ? WHERE id = ?";
  const [result] = await db.execute(q, [
    img,
    name,
    email,
    department,
    salary,
    id,
  ]);
  return result;
};
