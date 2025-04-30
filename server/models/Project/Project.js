import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  closed: { type: Date, default: null },
  created: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  modified: { type: Date, default: null },
  modifiedBy: { type: String, default: null },
  displayName: { type: String, required: true },
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
