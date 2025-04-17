import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  isAdmin: { type: Boolean, default: false, required: true },
  role: { type: String, required: true },
  bio: { type: String, default: null },
  jobtitle: { type: String, default: null },
  department: { type: String, default: null },
  address: { type: String, default: null },
  created: { type: Date, default: Date.now, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  modified: { type: Date, default: null },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  isDeleted: { type: Boolean, default: false },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
