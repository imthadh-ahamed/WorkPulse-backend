import bcrypt from "bcrypt";
import Employee from "../models/Employees/Employee.js";
import { generateAuthToken } from "../services/Employees/userService.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });

    if (!employee || !(await bcrypt.compare(password, employee.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateAuthToken(employee);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: error.message });
  }
};

export default {
  login,
  getCurrentUser,
};
