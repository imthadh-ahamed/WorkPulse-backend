import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TempEmployee",
    required: true,
  },
  companyName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: null },
  profileUrl: { type: String, default: null },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
  industry: { type: String },
  numberOfEmployees: { type: Number },
  websiteUrl: { type: String, default: null },
  taxId: { type: String, default: null },
  registrationNumber: { type: String, default: null },
  timezone: { type: String },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  subscription: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TempEmployee",
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

module.exports = mongoose.model("Tenant", tenantSchema);
