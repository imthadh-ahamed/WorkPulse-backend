import * as employeeService from "../../services/Employees/employeeServices.js";

export const getAllEmployees = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { page = 1, limit = 7, search = ""} = req.query;
    const employees = await employeeService.getAllEmployees(
      tenantId,
      page,
      limit,
      search
    );
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await employeeService.deleteEmployeeById(id);
    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(201).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmployee = await employeeService.updateEmployeeById(
      id,
      updates
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
