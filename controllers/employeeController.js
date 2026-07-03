import {
  allEmployees,
  employeeAdd,
  employeeDelete,
  employeeUpdate,
  findEmployeeEmail,
  singleEmployee,
} from "../models/employeeModel.js";

export const createEmployee = async (req, res) => {
  try {
    const { img, name, email, department, salary } = req.body;

    const employee = await findEmployeeEmail(email)

    if (employee.length) {
      return res.status(409).json("Employee already exists");
    }

    await employeeAdd(img, name, email, department, salary);
    res.status(200).json("Employee Created Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await singleEmployee(id);

    res.status(200).json({
      message: "Employee Found",
      employee,
    });
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

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeDelete(id);
    res.status(200).json("Delete Employee");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await employeeUpdate(id, req.body);

    res.status(200).json("Employee updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
