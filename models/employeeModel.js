import { db } from "../libs/db.js";

export const findEmployeeEmail = async (email) => {
  const q = "SELECT * FROM employees WHERE email = ?";
  const [row] = await db.execute(q, [email]);
  return row;
};

export const employeeAdd = async ({img, name, email, password, department, status, salary}) => {
  const values = [
    img || "https://cdn-icons-png.magnific.com/256/11136/11136505.png?semt=ais_white_label", 
    name || null, 
    email || null, 
    password || null, 
    department || null, 
    status || "inactive", 
    salary || null
  ];
  const q =
    "INSERT  INTO employees (img, name, email, password, department, status, salary) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const [result] = await db.execute(q, values);
  return result;
};

export const singleEmployee = async (id) => {
  const q = "SELECT * FROM employees WHERE id = ?";
  const [rows] = await db.execute(q, [id]);
  return rows;
};

export const allEmployees = async () => {
  const q = "SELECT * FROM employees WHERE status = 'active'";
  const [rows] = await db.execute(q);
  return rows;
};

export const allEmployeesInactive = async () => {
  const q = "SELECT * FROM employees WHERE status = 'inactive'";
  const [rows] = await db.execute(q);
  return rows;
};

export const employeeDelete = async (id) => {
  const q = "DELETE FROM employees WHERE id = ?";
  const [rows] = await db.execute(q, [id]);
  return rows[0];
};

export const employeeUpdate = async (id, { name, email, department, password, status, salary, img }) => {
  const q =
    "UPDATE employees SET img = ?, name = ?, email = ?, password = ?, department = ?, status = ?,  salary = ? WHERE id = ?";
  const [result] = await db.execute(q, [
    img,
    name,
    email,
    password,
    department,
    status,
    salary,
    id,
  ]);
  return result;
};

export const employeeUpdateStatus = async (id, status) => {
  const q =
    "UPDATE employees SET status = ? WHERE id = ?";
  const [result] = await db.execute(q, [
    status,
    id,
  ]);
  return result;
};

export const updateDBEmployee = async (id, employeeData) => {
  const {img, name, email } = employeeData;
  const q = "UPDATE employees SET img = ?, name = ?, email = ? WHERE id = ?";
  const [result] = await db.execute(q, [img, name, email, id]);
  return result;
};