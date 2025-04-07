import mongoose from "mongoose";

const InitialEmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true, unique: true },
  created: { type: Date, default: Date.now },
});

const InitialEmployee = mongoose.model(
  "InitialEmployee",
  InitialEmployeeSchema
);

export default InitialEmployee;
