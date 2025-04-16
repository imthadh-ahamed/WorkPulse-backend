import mongoose from "mongoose";

const tempEmployeeSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  invitationToken: { type: String, required: true },
  created: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
});

const TempEmployee = mongoose.model("TempEmployee", tempEmployeeSchema);

export default TempEmployee;
