import {
  allEmployees,
  allEmployeesInactive,
  employeeAdd,
  employeeDelete,
  employeeUpdate,
  employeeUpdateStatus,
  findEmployeeEmail,
  singleEmployee,
  updateDBEmployee,
} from "../models/employeeModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

export const createEmployee = async (req, res) => {
  try {

    const { img, name, email, password, department, status, salary } = req.body;
    if (!gmailRegex.test(email)) {
      return res.status(400).json("Only @gmail.com are allowed.");
    }
    const employee = await findEmployeeEmail(email);

    if (employee.length) {
      return res.status(409).json("Employee already exists");
    }

    const hashed = await bcrypt.hash(password, 12);

    await employeeAdd({
      img,
      name,
      email,
      password: hashed,
      department,
      status,
      salary,
    });
    res.status(200).json({message : "Employee Created Successfully", employee: {name, email}});
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await findEmployeeEmail(email);

    if (!employee.length) {
      return res.status(404).json("Employee not found");
    }

    if (employee[0].status === "inactive") {
      return res.status(404).json("Employee is not active. Please contact the admin.");
    }

    const check = await bcrypt.compare(password, employee[0].password);

    if (!check) {
      return res.status(401).json("Wrong Password");
    }

    const tokenEmployee = jwt.sign(
      {
        id: employee[0].id,
      },
      "tokenSecretEmployee",
      { expiresIn: "24h" },
    );

    const { password: pass, ...others } = employee[0];

    res.cookie("AccessTokenEmployee", tokenEmployee, {
      httpOnly: true,
    });
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error + " error");
  }
};

export const employeeLogout = async (req, res) => {
  res.clearCookie("AccessTokenEmployee", {
    httpOnly: true,
  });
  return res.status(200).json("Employee is logout");
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await singleEmployee(id);
    res.status(200).json({
      message: "Employee Found",
      employee: employee[0],
    });
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await singleEmployee(req.user.id);
    const { password: pass, ...others } = employee[0];
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await allEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const getAllEmployeesInactive = async (req, res) => {
  try {
    const employees = await allEmployeesInactive();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeDelete(id);
    res.status(200).json("Delete Employee");
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, password, status, salary, img } = req.body;

    const employee = await findEmployeeEmail(email);

    let hashed;

    if (password) {
      hashed = await bcrypt.hash(password, 12);
    } else {
      hashed = employee[0].password;
    }

    const result = await employeeUpdate(id, {
      name,
      email,
      department,
      password: hashed,
      status,
      salary,
      img,
    });

    res.status(200).json("Employee updated successfully");
  } catch (error) {
    res.status(500).json(error + "error");
  }
};

export const updateEmployeeProfile = async (req, res) => {
  try {
       const id = req.user.id;
  
       if (!gmailRegex.test(req.body.email)) {
        return res.status(400).json("Only @gmail.com are allowed.");
      }
  
       const result = await updateDBEmployee(id, req.body)
       res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error + "error")
    }
};

export const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await employeeUpdateStatus(id, status);
    res.status(200).json("Employee status updated");
  } catch (error) {
    res.status(500).json(error + "error");
  }
};
