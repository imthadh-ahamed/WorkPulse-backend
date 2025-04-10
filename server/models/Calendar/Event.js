import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  location: { type: String, default: null },
  type: {
    type: String,
    enum: ["meeting", "event", "deadline"],
    required: true,
  },
  repeat: {
    type: String,
    enum: ["once", "daily", "weekly", "monthly", "yearly"],
    required: true,
  },
  repeatEndDate: { type: Date, default: null },
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
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
