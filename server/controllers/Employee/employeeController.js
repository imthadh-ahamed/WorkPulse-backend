import userService from "../services/userService.js";

export const Signup = async (req, res) => {
  try {
    const { token, password } = req.body;
    const tempEmployee = await userService.getTempEmployeeByToken(token);

    if (!tempEmployee) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const employee = await userService.createEmployee({
      ...tempEmployee.toObject(),
      password,
    });

    await userService.deleteTempEmployee(tempEmployee._id);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
