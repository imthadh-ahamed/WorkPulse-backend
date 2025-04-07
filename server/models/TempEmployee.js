const mongoose = require("mongoose");

const tempEmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyName: { type: String, required: true, unique: true },
  invitationToken: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const TempEmployee = mongoose.model("TempEmployee", tempEmployeeSchema);

export default TempEmployee;
