import mongoose from "mongoose";

const focusSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, default: null },
  focusHours: { type: Number, required: true },
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

const FocusMode = mongoose.model("FocusMode", focusSchema);

export default FocusMode;
