import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Employee from "../../models/Employees/Employee.js";
import TempEmployee from "../../models/Employees/TempEmployee.js";
import InitialEmployee from "../../models/Employees/InitialEmployee.js";

export const createInitialEmployee = async (data) => {
  return await InitialEmployee.create(data);
};

export const deleteInitialEmployee = async (id, options = {}) => {
  return await InitialEmployee.findByIdAndDelete(id, options);
};

export const getInitialEmployeeByEmail = async (email) => {
  return await InitialEmployee.findById(email);
};

export const createTempEmployee = async (data) => {
  return await TempEmployee.create(data);
};

export const getTempEmployeeById = async (data) => {
  return await TempEmployee.findOne(data);
};

export const deleteTempEmployee = async (data) => {
  return await TempEmployee.findOneAndDelete(data);
};

export const createEmployee = async (data, options = {}) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const employee = new Employee(data);
  return await employee.save(options);
};

export const getEmployeeByEmail = async (email) => {
  return await Employee.findOne({ email });
};

export const generateAuthToken = (employee) => {
  return jwt.sign(
    {
      userId: employee._id,
      tenantId: employee.tenantId,
      isAdmin: employee.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
};

export const generateInvitationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const getTempEmployeeByToken = async (token) => {
  return await TempEmployee.findOne({ invitationToken: token });
};
