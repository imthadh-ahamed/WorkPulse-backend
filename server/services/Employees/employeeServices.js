import Employee from "../../models/Employees/Employee.js";

export const getAllEmployees = async (tenantId, page, limit, search) => {
  const filter = { tenantId, isDeleted: false};
  if (search) {
    filter.email = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;
  const employees = await Employee.find(filter).select("-password").skip(skip).limit(limit);
  const total = await Employee.countDocuments(filter);
  return { employees, total };
};

export const getEmployeeById = async (id) => {
  return await Employee.findOne({ _id: id, isDeleted: false });
};

export const deleteEmployeeById = async (id) => {
  const result = await Employee.findByIdAndUpdate(
    id,
    { isDeleted: true }
  );
  return result;
};

export const updateEmployeeById = async (id, updates) => {
  const result = await Employee.findByIdAndUpdate(id, updates);
  return result;
};
