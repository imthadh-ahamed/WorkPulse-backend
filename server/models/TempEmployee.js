import mongoose from "mongoose";

const tempEmployeeSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyName: { type: String, required: true, unique: true },
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
